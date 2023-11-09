import { Injectable } from '@nestjs/common';
import { CreateOrganizationDTO } from 'src/modules/organizations/dtos/create-organization.dtos';
import { GroupAddress, GroupCompanyDaum, ImobziOrganizationDTO } from './dtos/imobziOrganizations.dtos';
import { ImobziOrganizationsRepository } from './imobziOrganizations.reposiotry';

@Injectable()
export class ImobziOrganizationsService {
  constructor(private readonly imobziOrganizationsRepository: ImobziOrganizationsRepository) {}

  async getRequiredData(idOrg: string): Promise<CreateOrganizationDTO> {
    const orgFullData: ImobziOrganizationDTO = await this.imobziOrganizationsRepository.getFullData(idOrg);
    const id_imobzi = orgFullData.db_id.toString();
    let address: any;
    let cnpj: any;

    for (const item of orgFullData.fields.group_address) {
      address = item.find((item: GroupAddress) => {
        return item.field_id === 'address';
      });
      if (address) {
        address = address.value;
        break;
      }
    }
    for (const item of orgFullData.fields.group_company_data) {
      cnpj = item.find((item: GroupCompanyDaum) => {
        return item.field_id === 'cnpj';
      });
      if (cnpj) {
        cnpj = cnpj.value;
        break;
      }
    }

    const id_person_representative = orgFullData.persons[0]?.person_id.toString(); // third-party-api uses 'persons' instead of 'people'
    const representative_type = orgFullData.persons[0]?.associate_type;
    const phone = orgFullData.phone?.number;
    const { email, name } = orgFullData;

    return {
      address,
      cnpj,
      id_person_representative,
      representative_type,
      phone,
      id_imobzi,
      email,
      name,
    };
  }
}
