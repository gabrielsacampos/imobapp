import { Injectable } from '@nestjs/common';
import { ImobziContactsService } from 'src/third-party-api/imobzi/imobzi-contacts/ImobziContacts.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';

@Injectable()
export class ImobziService {
  constructor(
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
  ) {}

  async getContactsToUpdate(): Promise<any> {
    const { peopleImobziIdsToUpdate, organizationsImobziIdsToUpdate } =
      await this.imobziContactsService.getContactsImobziIdsToUpdate();

    const peopleMainData = await Promise.all(
      peopleImobziIdsToUpdate.map((id_person_imobzi: string) => {
        return this.imobziPeopleService.getPersonDataToDb(id_person_imobzi);
      }),
    );

    const orgsMainData = await Promise.all(
      organizationsImobziIdsToUpdate.map((id_org_imobzi: string) => {
        return this.imobziOrganizationsService.getOrgDataToDb(id_org_imobzi);
      }),
    );
    return { peopleMainData, orgsMainData };
  }

  async getPropertiesIdsToUpdate(): Promise<any> {
    return await this.imobziPropertiesService.getPropertiesIdsToUpdate();
  }
}
