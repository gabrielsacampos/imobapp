import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertiesRepository } from './properties.repository';

@Injectable()
export class PropertiesService implements Partial<PropertiesService> {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async create(data: CreatePropertyDTO) {
    try {
      const existingProperty = await this.findById(data.id_imobzi);
      if (existingProperty) throw new NotFoundException(`Property with id ${data.id_imobzi} already exists`);

      return await this.propertiesRepository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return this.propertiesRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string) {
    try {
      return await this.propertiesRepository.findById(id_imobzi);
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreatePropertyDTO) {
    try {
      await this.propertiesRepository.upsert(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
