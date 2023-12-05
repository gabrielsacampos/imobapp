import { Injectable } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { Property } from './entities/property.entity';
import { PropertiesRepository } from './properties.repository';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async upsert(data: CreatePropertyDTO): Promise<Property> {
    return this.propertiesRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.propertiesRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.propertiesRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }
}
