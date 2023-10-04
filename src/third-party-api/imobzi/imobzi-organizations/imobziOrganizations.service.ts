import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { OrganizationsCreateDTO } from 'src/modules/organizations/organizationsCreate.dtos';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { GroupAddress, GroupCompanyDaum } from './imobziOrganizations.dtos';

@Injectable()
export class ImobziOrganizationsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getRequiredOrganizationDataToDb(id_imobzi: string): Promise<OrganizationsCreateDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlOrganizationDetails(id_imobzi),
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

      const id_person_representative = data.persons[0]?.person_id.toString(); // third-party-api uses 'persons' instead of 'people'
      const representative_type = data.persons[0]?.associate_type;
      const phone = data.phone?.number;
      const { email, name } = data;

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
    } catch (error) {
      this.logger.error(
        ` Error on ImobziOrganizations.service > getRequiredOrganizationDataToDb: id_imobzi: ${id_imobzi}: ${error}`,
      );
    }
  }
}
