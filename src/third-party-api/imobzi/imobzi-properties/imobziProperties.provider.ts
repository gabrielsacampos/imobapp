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

  async getPropertyMainDataFromImobzi(propertyId: number): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get<PropertyDetailsDTO>(
        this.imobziUrl.urlPropertyDetails(propertyId),
        this.imobziParam,
      );
      const {
        db_id: id_imobzi, // property returns id as string xD
        alternative_code,
        area,
        building_id,
        sale_value,
        rental_value,
        status,
        property_type: type,
        garage,
        suite,
        bedroom,
        active,
      } = data;

      return {
        id_imobzi,
        alternative_code,
        area,
        building_id,
        sale_value,
        rental_value,
        status,
        type,
        garage,
        suite,
        bedroom,
        active,
      };
    } catch (error) {
      console.error(error.message);
    }
  }
}
