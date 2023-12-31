import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziOrganizationDTO } from './dtos/imobziOrganizations.dtos';

@Injectable()
export class ImobziOrganizationsRepository {
  constructor(private readonly httpService: HttpService) {}

  async getFullData(id_imobzi: string): Promise<ImobziOrganizationDTO> {
    const { data } = await this.httpService.axiosRef.get(imobziUrls.urlOrganizationDetails(id_imobzi), imobziParams);

    return data;
  }
}
