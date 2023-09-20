import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziUrlService, ImobziParamService } from '../imobzi-urls-params/imobziUrls.service';
import { PropertyDTO } from './imobziProperties.dtos';

@Injectable()
export class ImobziPropertiesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getAvailablePropertiesFromApi(): Promise<any> {
    try {
      const availableProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(
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
        const { data } = await this.httpService.axiosRef.get(
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

  async getAllPropertiesFromApi(): Promise<any> {
    try {
      const unavailableProperties = await this.getUnavailablePropertiesFromApi();
      const availableProperties = await this.getAvailablePropertiesFromApi();

      return { unavailableProperties, availableProperties };
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAllPropertiesFromDb(): Promise<any> {
    try {
      return await this.prisma.property.findMany();
    } catch (error) {
      console.error('error on getPropertiesToUpdate function');
      console.error(error.message);
      console.trace(error);
    }
  }

  async getPropertiesIdsToUpdate(): Promise<any> {
    try {
      const propertiesToUpdateIds: any[] = [];

      const propertiesOnDb = await this.getAllPropertiesFromDb();
      const { unavailableProperties, availableProperties } = await this.getAllPropertiesFromApi();

      const propertiesOnApi = [...unavailableProperties, ...availableProperties];

      propertiesOnApi.forEach((propertyOnApi: PropertyDTO) => {
        const propertiesOnDbIds = propertiesOnDb.map((propertyOndDb) => propertyOndDb.id.toString());
        const existisCurrentPropertyOnDb = propertiesOnDb.find((propertyOnDb) => {
          return propertyOnDb.id.toString() === propertyOnApi.db_id;
        });

        if (existisCurrentPropertyOnDb) {
          if (new Date(propertyOnApi.updated_at) > new Date(existisCurrentPropertyOnDb.updated_at)) {
            propertiesToUpdateIds.push(propertyOnApi.db_id);
          }
        } else if (!propertiesOnDbIds.includes(propertyOnApi.db_id)) {
          propertiesToUpdateIds.push(propertyOnApi.db_id);
        }
      });
      return propertiesToUpdateIds;
    } catch (error) {
      console.error('error on getPropertiesToUpdate function');
      console.error(error.message);
      console.trace(error);
    }
  }
}
