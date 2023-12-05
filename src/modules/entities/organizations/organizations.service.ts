import { Injectable } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  async upsert(data: CreateOrganizationDTO): Promise<Organization> {
    return this.organizationsRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.organizationsRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.organizationsRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }
}
