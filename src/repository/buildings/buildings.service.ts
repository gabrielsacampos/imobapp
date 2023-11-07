import { Injectable } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(private readonly buildingsRepository: BuildingsRepository) {}

  async upsert(data: CreateBuildingDTO): Promise<Building> {
    try {
      const found = this.buildingsRepository.findById(data.id_imobzi);
      if (found) {
        return this.buildingsRepository.update(data.id_imobzi, data);
      } else {
        return this.buildingsRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
