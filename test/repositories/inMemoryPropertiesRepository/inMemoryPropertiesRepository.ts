import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CreatePropertyDTO } from 'src/repository/properties/dtos/create-property.dtos';
import { Property } from 'src/repository/properties/entities/property.entity';
import { PropertiesRepository } from 'src/repository/properties/properties.repository';
import { inMemoryPropertiesRepositoryMock } from './inMemoryPropertiesRepository.mock';

@Injectable()
export class InMemoryPropertiesRepository implements Partial<PropertiesRepository> {
  items = inMemoryPropertiesRepositoryMock;

  async create(data: CreatePropertyDTO): Promise<Property> {
    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll(): Promise<Property[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<Property> {
    try {
      const found = this.items.find((property) => property.id_imobzi === id_imobzi);
      if (!found) {
        throw new NotFoundException(`Person id_imozbi: ${id_imobzi} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreatePropertyDTO): Promise<Property> {
    const existingPersonIndex = this.items.findIndex((property) => property.id_imobzi === data.id_imobzi);

    if (existingPersonIndex === -1) {
      const personToCreate = data;
      return this.create(personToCreate);
    } else {
      const existingPerson = this.items[existingPersonIndex];
      const existingPersonUpdated = data;
      this.items[existingPersonIndex] = existingPersonUpdated;
      return existingPerson;
    }
  }
}
