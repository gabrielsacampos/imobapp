import { Controller } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { Property } from './entities/property.entity';
import { PropertiesRepository } from './properties.repository';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async create(data: CreatePropertyDTO): Promise<Property> {
    return await this.propertiesRepository.create(data);
  }

  async findAll(): Promise<Property[]> {
    return this.propertiesRepository.findAll();
  }

  async findById(id_imobzi: string): Promise<Property> {
    return await this.propertiesRepository.findById(id_imobzi);
  }

  async update(id_imobzi: string, data: CreatePropertyDTO): Promise<Property> {
    return await this.propertiesRepository.update(id_imobzi, data);
  }
}
