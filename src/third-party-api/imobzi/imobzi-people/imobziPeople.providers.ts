import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

@Injectable()
export class ImobziPeopleProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getPersonFullDataFromImobzi(id_person_imobzi: number | string): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlPersonDetails(id_person_imobzi),
        this.imobziParam,
      );

      return data;
    } catch (error) {
      console.error('error on getPersonDataToDb function');
      console.error('request with id', id_person_imobzi);
      console.error(error.message);
    }
  }
}
