import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { GroupAddress, GroupCompanyDaum } from './imobziOrganizations.dtos';

@Injectable()
export class ImobziOrganizationsProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getOrgMainDataFromImobzi(id_org_imobzi: number | string): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlOrganizationDetails(id_org_imobzi),
        this.imobziParam,
      );

      let address: any;
      let cnpj: any;

      for (const item of data.fields.group_address) {
        address = item.find((item: GroupAddress) => {
          return item.field_id === 'address';
        });
        if (address) {
          address = address.value;
          break;
        }
      }
      for (const item of data.fields.group_company_data) {
        cnpj = item.find((item: GroupCompanyDaum) => {
          return item.field_id === 'cnpj';
        });
        if (cnpj) {
          cnpj = cnpj.value;
          break;
        }
      }

      const person_id_representative = data.persons[0].person_id; // third-party-api uses 'persons' instead of 'people'
      const representative_type = data.persons[0].associate_type;
      const phone = data.phone.number;
      const id_imobzi = data.db_id.toString();
      const { email, name } = data;

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
    } catch (error) {
      console.error('error on getOrgDataToDb function');
      console.error('request with id', id_org_imobzi);
      console.error(error.message);
    }
  }
}
