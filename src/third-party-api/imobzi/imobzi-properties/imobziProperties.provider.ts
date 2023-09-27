import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziUrlService, ImobziParamService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziPropertiesDTO } from './imobziProperties.dtos';
import { PropertyDetailsDTO } from './imobziPropertyDetails.dtos';

@Injectable()
export class ImobziPropertiesProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getAvailablePropertiesFromApi(): Promise<any> {
    try {
      const availableProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          this.imobziUrl.urlProperties('all', cursor),
          this.imobziParam,
        );
        availableProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);
      return availableProperties;
    } catch (error) {
      console.error(error.message);
    }
  }

  async getUnavailablePropertiesFromApi(): Promise<any> {
    try {
      const unavailableProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          this.imobziUrl.urlProperties('unavailable_properties', cursor),
          this.imobziParam,
        );
        unavailableProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return unavailableProperties;
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAllPropertiesFromImobzi(): Promise<any> {
    try {
      const unavailableProperties = await this.getUnavailablePropertiesFromApi();
      const availableProperties = await this.getAvailablePropertiesFromApi();

      return { unavailableProperties, availableProperties };
    } catch (error) {
      console.error(error.message);
    }
  }

  async getPropertyFullDataFromImobzi(id_imobzi: number | string): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get<PropertyDetailsDTO>(
        this.imobziUrl.urlPropertyDetails(id_imobzi),
        this.imobziParam,
      );
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
