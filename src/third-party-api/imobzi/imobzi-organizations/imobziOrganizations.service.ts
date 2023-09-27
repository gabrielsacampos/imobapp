import { Injectable } from '@nestjs/common';
import { GroupAddress, GroupCompanyDaum } from './imobziOrganizations.dtos';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';

@Injectable()
export class ImobziOrganizationsService {
  constructor(private readonly imobziOrganizationsProvider: ImobziOrganizationsProvider) {}

  async formatOrgDataToDb(id_org_imobzi: number | string): Promise<any> {
    const organizationFullData = await this.imobziOrganizationsProvider.getOrgFullDataFromImobzi(id_org_imobzi);
    let address: any;
    let cnpj: any;

    for (const item of organizationFullData.fields.group_address) {
      address = item.find((item: GroupAddress) => {
        return item.field_id === 'address';
      });
      if (address) {
        address = address.value;
        break;
      }
    }
    for (const item of organizationFullData.fields.group_company_data) {
      cnpj = item.find((item: GroupCompanyDaum) => {
        return item.field_id === 'cnpj';
      });
      if (cnpj) {
        cnpj = cnpj.value;
        break;
      }
    }

    const person_id_representative = organizationFullData.persons[0].person_id; // third-party-api uses 'persons' instead of 'people'
    const representative_type = organizationFullData.persons[0].associate_type;
    const phone = organizationFullData.phone.number;
    const id_imobzi = organizationFullData.db_id.toString();
    const { email, name } = organizationFullData;

    return {
      address,
      cnpj,
      person_id_representative,
      representative_type,
      phone,
      id_imobzi,
      email,
      name,
    };
  }
}
