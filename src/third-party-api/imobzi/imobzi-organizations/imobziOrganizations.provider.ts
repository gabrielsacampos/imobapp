import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

@Injectable()
export class ImobziOrganizationsProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getOrgFullDataFromImobzi(id_org_imobzi: number | string): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlOrganizationDetails(id_org_imobzi),
        this.imobziParam,
      );

      return data;
    } catch (error) {
      console.error('error on getOrgDataToDb function');
      console.error('request with id', id_org_imobzi);
      console.error(error.message);
    }
  }
}
