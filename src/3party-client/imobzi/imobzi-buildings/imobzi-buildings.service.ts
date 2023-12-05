import { Injectable } from '@nestjs/common';
import { CreateBuildingDTO } from 'src/modules/entities/buildings/dtos/create-building.dtos';
import { BuildingDTO } from './dtos/imobziBuildings.dtos';

@Injectable()
export class ImobziBuildingsService {
  getRequiredData(buildingData: BuildingDTO): CreateBuildingDTO {
    const { address, city, building_name: name, zipcode } = buildingData;
    const id_imobzi = buildingData.db_id.toString();
    return { id_imobzi, address, city, name, zipcode };
  }
}
