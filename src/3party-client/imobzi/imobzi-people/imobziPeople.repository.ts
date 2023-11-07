import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziPersonDTO } from './dtos/imobziPeople.dtos';

@Injectable()
export class ImobziPeopleRepository {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async getPersonFullData(id_imobzi: string): Promise<ImobziPersonDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPersonDetails(id_imobzi), imobziParams);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
