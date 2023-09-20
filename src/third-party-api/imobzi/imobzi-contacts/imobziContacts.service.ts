import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParam, ImobziUrl } from '../imobzi.urls';
import { ContactDTO } from './imobziContacts.dtos';

@Injectable()
export class ImobziContactsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly imobziUrl: ImobziUrl,
    private readonly imobziParam: ImobziParam,
  ) {}

  private getPeopleIdsToUpdate(peopleContacts: ContactDTO[], peopleFromDb: any[]): object {
    const peopleIds = [];

    peopleContacts.forEach((personContact) => {
      const peopleOnDbIds = peopleFromDb.map((personOnDb) => personOnDb.id.toString());
      const existsCurrentPerson = peopleFromDb.find((personOnDb) => personOnDb.id === BigInt(personContact.contact_id));

      if (existsCurrentPerson) {
        if (new Date(personContact.updated_at) > new Date(existsCurrentPerson.updated_at)) {
          peopleIds.push(personContact.contact_id);
        }
      } else if (!peopleOnDbIds.includes(personContact.contact_id)) {
        peopleIds.push(personContact.contact_id);
      }
    });

    return peopleIds;
  }

  private getOrgIdsToUpdate(orgsContacts: ContactDTO[], orgsFromDb: any[]): object {
    const orgsIds = [];

    orgsContacts.forEach((orgContact) => {
      const orgsOnDbIds = orgsFromDb.map((orgOnDb) => orgOnDb.id.toString());
      const existisCurrentOrg = orgsFromDb.find((orgOnDb) => orgOnDb.id === BigInt(orgContact.contact_id));

      if (existisCurrentOrg) {
        if (new Date(orgContact.updated_at) > new Date(existisCurrentOrg.updated_at)) {
          orgsIds.push(orgContact.contact_id);
        }
      } else if (!orgsOnDbIds.includes(orgContact.contact_id)) {
        orgsIds.push(orgContact.contact_id);
      }
    });

    return orgsIds;
  }

  private async getContactsByType(): Promise<any> {
    const people = [];
    const organizations = [];

    let cursor = '';
    // do {
    const { data } = await this.httpService.axiosRef.get(this.imobziUrl.urlContacts(cursor), this.imobziParam);
    cursor = data.cursor;
    data.contacts.forEach((contact: ContactDTO) => {
      const { contact_id, updated_at } = contact;
      if (contact.contact_type === 'organization') {
        organizations.push({ contact_id, updated_at });
      } else {
        people.push({ contact_id, updated_at });
      }
    });
    // } while (cursor);

    return { people, organizations };
  }

  async getContactsToUpdate(): Promise<any> {
    const { people, organizations } = await this.getContactsByType();

    const existsPeople = await this.prisma.person.findMany({
      select: {
        id: true,
        updated_at: true,
      },
    });

    const existsOrganization = await this.prisma.organization.findMany({
      select: {
        id: true,
        updated_at: true,
      },
    });

    const peopleIds = this.getPeopleIdsToUpdate(people, existsPeople);
    const orgsIds = this.getOrgIdsToUpdate(organizations, existsOrganization);

    return { peopleIds, orgsIds };
  }
}
