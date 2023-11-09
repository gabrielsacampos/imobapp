import { Injectable } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { Property } from './entities/property.entity';
import { PropertiesRepository } from './properties.repository';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async upsert(data: CreatePropertyDTO): Promise<Property> {
    try {
      const found = this.propertiesRepository.findById(data.id_imobzi);
      if (found) {
        return this.propertiesRepository.update(data.id_imobzi, data);
      } else {
        return this.propertiesRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
