import { Logger } from 'winston';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { BuildingsCreateDTO } from 'src/db/modules/buildings/buildingsCreate.dtos';
import { BuildingDTO } from './imobziBuildings.dtos';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';

@Injectable()
export class ImobziBuildingsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async getAllBuildings(): Promise<BuildingDTO[]> {
    try {
      const allBuildings: BuildingDTO[] = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(imobziUrls.urlAllBuildings(cursor), imobziParams);
        allBuildings.push(...data.properties);
        cursor = data.cursor;

        this.logger.verbose(`buildings catched > ${allBuildings.length}`);
      } while (cursor);

      return allBuildings;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async getRequiredBuildingDataToDb(buildingData: BuildingDTO): Promise<BuildingsCreateDTO> {
    const { address, city, building_name: name, zipcode } = buildingData;
    const id_imobzi = buildingData.db_id.toString();
    return { id_imobzi, address, city, name, zipcode };
  }
}
