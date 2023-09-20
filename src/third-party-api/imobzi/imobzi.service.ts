import { Injectable } from '@nestjs/common';
import { ImobziContactsService } from 'src/third-party-api/imobzi/imobzi-contacts/ImobziContacts.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';

@Injectable()
export class ImobziService {
  constructor(
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
  ) {}

  async getContactsToUpdate(): Promise<any> {
    const { peopleIds, orgsIds } = await this.imobziContactsService.getContactsToUpdate();

    const peopleMainData = await Promise.all(
      peopleIds.map((personId: bigint) => {
        return this.imobziPeopleService.getPersonDataToDb(personId);
      }),
    );

    const orgsMainData = await Promise.all(
      orgsIds.map((orgIds: bigint) => {
        return this.imobziOrganizationsService.getOrgDataToDb(orgIds);
      }),
    );
    return { peopleMainData, orgsMainData };
  }
}
