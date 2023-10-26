
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateBuildingDTO } from 'src/repository/buildings/dtos/create-building.dtos';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { BuildingDTO } from './imobziBuildings.dtos';

@Injectable()
export class ImobziBuildingsService {
  constructor(private readonly httpService: HttpService) {}

  async getAllBuildings(): Promise<BuildingDTO[]> {
    try {
      const allBuildings: BuildingDTO[] = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(imobziUrls.urlAllBuildings(cursor), imobziParams);
        allBuildings.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return allBuildings;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRequiredBuildingDataToDb(buildingData: BuildingDTO): Promise<CreateBuildingDTO> {
    const { address, city, building_name: name, zipcode } = buildingData;
    const id_imobzi = buildingData.db_id.toString();
    return { id_imobzi, address, city, name, zipcode };
  }
}
