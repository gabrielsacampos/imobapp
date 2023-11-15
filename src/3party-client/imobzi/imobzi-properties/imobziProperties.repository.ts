import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziPropertiesDTO } from './dtos/imobziProperties.dtos';
import { ImobziPropertyDetailsDTO } from './dtos/imobziPropertyDetails.dtos';

@Injectable()
export class ImobziPropertiesRepository {
  private logger = new Logger('ImobziPropertiesRepository');
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<any> {
    try {
      const allProperties = [];

      let totalProperties = 0;
      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('all', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
        totalProperties = data.count;
        this.logger.verbose(`got ${allProperties.length}/${totalProperties} PROPERTIES (available)`);
      } while (cursor);

      cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('unavailable_properties', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
        this.logger.verbose(`got ${allProperties.length}/${totalProperties + data.count} PROPERTIES (unavailable)`);
      } while (cursor);

      return allProperties;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFullData(id_imobzi: string): Promise<ImobziPropertyDetailsDTO> {
    const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPropertyDetails(id_imobzi), imobziParams);
    return data;
  }
}
