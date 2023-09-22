import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziPropertiesProvider } from './imobziProperties.provider';

@Injectable()
export class ImobziPropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziPropertiesProvider: ImobziPropertiesProvider,
  ) {}

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
      const propertiesOnDb = await this.getAllPropertiesFromDb();
      const { unavailableProperties, availableProperties } =
        await this.imobziPropertiesProvider.getAllPropertiesFromImobzi();

      const propertiesFromApi = [...unavailableProperties, ...availableProperties];

      const propertiesOnDbIds = propertiesOnDb.map((propertyOndDb: any) => propertyOndDb.id_imobzi);
      const propertiesFromApiIds = propertiesFromApi.map((propertyOnApi: any) => propertyOnApi.db_id.toString());

      const missingIdsOnDb: string[] = propertiesFromApiIds.filter((propertyFromApiId: string) => {
        // if DB.properties does not include the current id from API
        return !propertiesOnDbIds.includes(propertyFromApiId);
      });

      const idsToUpdate: string[] = propertiesFromApiIds.filter((propertyFromApiId: string) => {
        // find property into DB and Api's data to compare updated_at value.
        const currentPropertyOnDb = propertiesOnDb.find((propertyOnDb) => propertyOnDb.id_imobzi === propertyFromApiId);
        const currentPropertyFromApi = propertiesFromApi.find(
          (propertyFromApi) => propertyFromApi.db_id === propertyFromApiId,
        );

        // if DB.properties has current org from Api's data.
        if (currentPropertyOnDb) {
          // return if updated_at from api is newer than updated_at on DB.
          return new Date(currentPropertyOnDb.updated_at) < new Date(currentPropertyFromApi.updated_at);
        }
      });

      return [...idsToUpdate, ...missingIdsOnDb];
    } catch (error) {
      console.error('error on getPropertiesToUpdate function');
      console.error(error.message);
      console.trace(error);
    }
  }
}
