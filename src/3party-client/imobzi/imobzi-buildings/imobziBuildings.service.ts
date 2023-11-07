import { Injectable } from '@nestjs/common';
import { CreateBuildingDTO } from 'src/repository/buildings/dtos/create-building.dtos';
import { BuildingDTO } from './dtos/imobziBuildings.dtos';
import { ImobziBuildingsRepository } from './imobziBuildings.repository';

@Injectable()
export class ImobziBuildingsService {
  constructor(private readonly imobziBuildingsRepository: ImobziBuildingsRepository) {}

  async getRequiredBuildingDataToDb(): Promise<CreateBuildingDTO[]> {
    try {
      const buildings: BuildingDTO[] = await this.imobziBuildingsRepository.getAllBuildings();
      return buildings.map((building) => {
        const { address, city, building_name: name, zipcode } = building;
        const id_imobzi = building.db_id.toString();
        return { id_imobzi, address, city, name, zipcode };
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
