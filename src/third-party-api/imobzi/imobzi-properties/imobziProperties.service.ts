import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziPropertiesProvider } from './imobziProperties.provider';

@Injectable()
export class ImobziPropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziPropertiesProvider: ImobziPropertiesProvider,
  ) {}

  async formatPropertyDataToDb(id_imobzi: string | number) {
    const propertyFullData = await this.imobziPropertiesProvider.getPropertyFullDataFromImobzi(id_imobzi);
    const {
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
    } = propertyFullData;

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
  }

  async getPropertiesIdsToUpdate(): Promise<any> {
    try {
      const propertiesOnDb = await this.prisma.property.findMany();
      const { unavailableProperties, availableProperties } =
        await this.imobziPropertiesProvider.getAllPropertiesFromImobzi();

      const propertiesFromApi = [...unavailableProperties, ...availableProperties];
      const propertiesFromApiIds = propertiesFromApi.map((propertyOnApi: any) => propertyOnApi.db_id.toString());

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
        } else {
          return true;
        }
      });

      return idsToUpdate;
    } catch (error) {
      console.error('error on getPropertiesToUpdate function');
      console.error(error.message);
      console.trace(error);
    }
  }
}
