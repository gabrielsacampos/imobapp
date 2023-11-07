import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { BuildingsRepository } from 'src/repository/buildings/buildings.repository';
import { CreateBuildingDTO } from 'src/repository/buildings/dtos/create-building.dtos';
import { Building } from 'src/repository/buildings/entities/building.entity';
import { inMemoryBuildingsRepositoryMock } from './inMemoryBuildingsRepository.mock';
import * as crypto from 'node:crypto';

export class InMemoryBuildingsRepository implements Partial<BuildingsRepository> {
  items: Building[] = inMemoryBuildingsRepositoryMock;

  async create(data: CreateBuildingDTO): Promise<Building> {
    const found = this.items.find((building) => building.id_imobzi === data.id_imobzi);
    if (found) {
      throw new NotAcceptableException(`ID: ${data.id_imobzi} already exists at leases`);
    }
    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return found;
  }

  async findAll(): Promise<Building[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<Building> {
    const found = this.items.find((building) => building.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at buildings`);
    }
    return found;
  }

  async upsert(data: CreateBuildingDTO): Promise<Building> {
    const existingBuildingIndex = this.items.findIndex((building) => building.id_imobzi === data.id_imobzi);

    if (existingBuildingIndex === -1) {
      const buildingToCreate = data;
      buildingToCreate.id = crypto.randomInt(1, 1000);
      this.create(buildingToCreate);
      return buildingToCreate;
    } else {
      const existingBuilding = this.items[existingBuildingIndex];
      const existingBuildingUpdated = data;
      this.items[existingBuildingIndex] = existingBuildingUpdated;
      return existingBuilding;
    }
  }
}
