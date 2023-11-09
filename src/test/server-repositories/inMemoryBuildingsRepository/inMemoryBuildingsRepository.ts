import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { BuildingsRepository } from 'src/modules/buildings/buildings.repository';
import { CreateBuildingDTO } from 'src/modules/buildings/dtos/create-building.dtos';
import { Building } from 'src/modules/buildings/entities/building.entity';
import { inMemoryBuildingsRepositoryMock } from './inMemoryBuildingsRepository.mock';
import * as crypto from 'node:crypto';
import { UpdateBuildingDTO } from 'src/modules/buildings/dtos/update-building.dtos';

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

  async update(id_imobzi: string, data: UpdateBuildingDTO): Promise<UpdateBuildingDTO> {
    const foundIndex = this.items.findIndex((building) => {
      return building.id_imobzi === id_imobzi;
    });

    const foundBuilding = this.items.find((building) => {
      return building.id_imobzi === id_imobzi;
    });

    if (foundIndex === -1) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at buildings`);
    }

    this.items[foundIndex] = { id: foundBuilding.id, ...data };
    return data;
  }
}
