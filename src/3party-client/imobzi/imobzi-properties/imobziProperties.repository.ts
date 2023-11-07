import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziPropertiesDTO } from './dtos/imobziProperties.dtos';
import { ImobziPropertyDetailsDTO } from './dtos/imobziPropertyDetails.dtos';

@Injectable()
export class ImobziPropertiesRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAllProperties(): Promise<any> {
    try {
      const allProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('all', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('unavailable_properties', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return allProperties;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPropertyFullData(id_imobzi: string): Promise<ImobziPropertyDetailsDTO> {
    const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPropertyDetails(id_imobzi), imobziParams);
    return data;
  }
}
