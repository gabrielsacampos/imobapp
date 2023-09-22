import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactDTO } from './imobziContacts.dtos';
import { ImobziContactsProvider } from './imobziContacts.provider';

@Injectable()
export class ImobziContactsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziContactsProvider: ImobziContactsProvider,
  ) {}

  getContactsByType(allContacts: ContactDTO[]): { organizations: any[]; people: any[] } {
    const people = allContacts.filter((contact) => contact.contact_type === 'person');
    const organizations = allContacts.filter((contact) => contact.contact_type === 'organization');

    return { organizations, people };
  }

  async getPeopleImobziIdsToUpdate(peopleFromApi: ContactDTO[]): Promise<any[]> {
    const peopleOnDb = await this.prisma.person.findMany({
      select: {
        id_imobzi: true,
        updated_at: true,
      },
    });

    const peopleOnDbIds = peopleOnDb.map((personOnDb) => personOnDb.id_imobzi);
    const peopleFromApiIds = peopleFromApi.map((personFromApi) => personFromApi.contact_id);

    const missingIndsOnDb: string[] = peopleFromApiIds.filter((id: string) => {
      // if DB.people does not include the current id from API
      return !peopleOnDbIds.includes(id);
    });

    const idsToUpdate: string[] = peopleFromApiIds.filter((personIdFromApiId: string) => {
      // find person into DB and Api's data to compare updated_at value.
      const currentPersonOnDb = peopleOnDb.find((personOnDb) => personOnDb.id_imobzi === personIdFromApiId);
      const currentPersonFromApi = peopleFromApi.find(
        (personFromApi) => personFromApi.contact_id === personIdFromApiId,
      );

      // if DB.people has current org from Api's data.
      if (currentPersonOnDb) {
        // return if updated_at from api is newer than updated_at on DB.
        return new Date(currentPersonOnDb.updated_at) < new Date(currentPersonFromApi.updated_at);
      }
    });

    return [...idsToUpdate, ...missingIndsOnDb];
  }

  async getOrgsImobziIdsToUpdate(orgsFromApi: ContactDTO[]): Promise<any[]> {
    const orgsOnDb = await this.prisma.organization.findMany({
      select: {
        id_imobzi: true,
        updated_at: true,
      },
    });
    const orgsOnDbImobziIds: string[] = orgsOnDb.map((orgOnDb) => orgOnDb.id_imobzi);
    const orgsFromApiIds: string[] = orgsFromApi.map((orgFromApi) => orgFromApi.contact_id);

    const missingIndsOnDb: string[] = orgsFromApiIds.filter((id: string) => {
      // if DB.organization does not include the current id from API
      return !orgsOnDbImobziIds.includes(id);
    });

    const idsToUpdate = orgsFromApiIds.filter((orgIdFromApi: string) => {
      // find organization into DB and Api's data to compare updated_at value.
      const currentOrgOnDb = orgsOnDb.find((orgOnDb) => orgOnDb.id_imobzi === orgIdFromApi);
      const currentOrgFromApi = orgsFromApi.find((orgFromApi) => orgFromApi.contact_id === orgIdFromApi);

      // if DB.organizations has current org from Api's data.
      if (currentOrgOnDb) {
        // return if updated_at from api is newer than updated_at on DB.
        return new Date(currentOrgOnDb.updated_at) < new Date(currentOrgFromApi.updated_at);
      }
    });

    return [...missingIndsOnDb, ...idsToUpdate];
  }

  async getContactsImobziIdsToUpdate(): Promise<object> {
    const allContacts = await this.imobziContactsProvider.getAllContacts();
    const { organizations, people } = this.getContactsByType(allContacts);

    const peopleImobziIdsToUpdate = await this.getPeopleImobziIdsToUpdate(people);
    const organizationsImobziIdsToUpdate = await this.getOrgsImobziIdsToUpdate(organizations);

    return {
      peopleToUpdate: peopleImobziIdsToUpdate,
      orgsToUpdate: organizationsImobziIdsToUpdate,
    };
  }
}
