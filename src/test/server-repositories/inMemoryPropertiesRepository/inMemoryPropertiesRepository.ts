import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CreatePropertyDTO } from 'src/modules/entities/properties/dtos/create-property.dtos';
import { Property } from 'src/modules/entities/properties/entities/property.entity';
import { PropertiesRepository } from 'src/modules/entities/properties/properties.repository';
import { inMemoryPropertiesRepositoryMock } from './inMemoryPropertiesRepository.mock';

@Injectable()
export class InMemoryPropertiesRepository implements Partial<PropertiesRepository> {
  items = inMemoryPropertiesRepositoryMock;

  async create(data: CreatePropertyDTO): Promise<Property> {
    const existingProperty = this.items.find((prop) => {
      return prop.id_imobzi === data.id_imobzi;
    });

    if (existingProperty) throw new NotFoundException(`Property with id ${data.id_imobzi} already exists`);

    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll(): Promise<Property[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<Property> {
    const found = this.items.find((prop) => prop.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`Person id_imozbi: ${id_imobzi} not found`);
    }
    return found;
  }

  async update(id_imobzi: string, data: CreatePropertyDTO): Promise<Property> {
    const existingPropertyIndex = this.items.findIndex((prop) => prop.id_imobzi === id_imobzi);
    const existingProp = this.items.find((prop) => prop.id_imobzi === id_imobzi);

    if (!existingProp) {
      throw new NotFoundException(`Person id_imozbi: ${id_imobzi} not found`);
    }

    this.items[existingPropertyIndex] = { id: existingProp.id, ...data };
    return data;
  }
}
