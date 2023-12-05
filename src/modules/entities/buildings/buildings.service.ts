import { Injectable } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(private readonly buildingsRepository: BuildingsRepository) {}

  async upsert(data: CreateBuildingDTO): Promise<Building> {
    return this.buildingsRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.buildingsRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.buildingsRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }
}
