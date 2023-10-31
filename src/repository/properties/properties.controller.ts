import { Controller } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { Property } from './entities/property.entity';
import { PropertiesRepository } from './properties.repository';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async create(data: CreatePropertyDTO): Promise<Property> {
    try {
      return await this.propertiesRepository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Property[]> {
    try {
      return this.propertiesRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Property> {
    try {
      return await this.propertiesRepository.findById(id_imobzi);
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreatePropertyDTO): Promise<Property> {
    try {
      return await this.propertiesRepository.upsert(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
