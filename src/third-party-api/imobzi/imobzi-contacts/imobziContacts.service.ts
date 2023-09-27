import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziOrganizationsService } from '../imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from '../imobzi-people/imobziPeople.service';
import { ContactDTO } from './imobziContacts.dtos';
import { ImobziContactsProvider } from './imobziContacts.provider';

@Injectable()
export class ImobziContactsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziContactsProvider: ImobziContactsProvider,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziPeopleService: ImobziPeopleService,
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

    const peopleFromApiIds = peopleFromApi.map((personFromApi) => personFromApi.contact_id);

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
      } else {
        return true;
      }
    });

    return idsToUpdate;
  }

  async getOrgsImobziIdsToUpdate(orgsFromApi: ContactDTO[]): Promise<any[]> {
    const orgsOnDb = await this.prisma.organization.findMany({
      select: {
        id_imobzi: true,
        updated_at: true,
      },
    });

    const orgsFromApiIds: string[] = orgsFromApi.map((orgFromApi) => orgFromApi.contact_id);

    const idsToUpdate = orgsFromApiIds.filter((orgIdFromApi: string) => {
      // find organization into DB and Api's data to compare updated_at value.
      const currentOrgOnDb = orgsOnDb.find((orgOnDb) => orgOnDb.id_imobzi === orgIdFromApi);
      const currentOrgFromApi = orgsFromApi.find((orgFromApi) => orgFromApi.contact_id === orgIdFromApi);

      // if DB.organizations has current org from Api's data.
      if (currentOrgOnDb) {
        // return if updated_at from api is newer than updated_at on DB.
        return new Date(currentOrgOnDb.updated_at) < new Date(currentOrgFromApi.updated_at);
      } else {
        return true;
      }
    });

    return idsToUpdate;
  }

  async getContactsToStoreIntoDb(): Promise<any> {
    const allContacts = await this.imobziContactsProvider.getAllContacts();
    const { organizations, people } = this.getContactsByType(allContacts);

    const peopleImobziIdsToUpdate = await this.getPeopleImobziIdsToUpdate(people);
    const orgsImobziIdsToUpdate = await this.getOrgsImobziIdsToUpdate(organizations);

    const peopleToUpdate = [];
    for (const personId of peopleImobziIdsToUpdate) {
      const personFormatedData = await this.imobziPeopleService.formatPersonDataToDb(personId);
      peopleToUpdate.push(personFormatedData);
    }

    const orgsToUpdate = [];
    for (const orgId of orgsImobziIdsToUpdate) {
      const orgFormatedData = await this.imobziOrganizationsService.formatOrgDataToDb(orgId);
      orgsToUpdate.push(orgFormatedData);
    }

    return { peopleToUpdate, orgsToUpdate };
  }
}
