import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziPersonDTO } from './dtos/imobziPeople.dtos';

@Injectable()
export class ImobziPeopleRepository {
  constructor(private readonly httpService: HttpService) {}

  async getFullData(id_imobzi: string): Promise<ImobziPersonDTO> {
    const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPersonDetails(id_imobzi), imobziParams);

    return data;
  }
}
