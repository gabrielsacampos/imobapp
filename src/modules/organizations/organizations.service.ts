import { Injectable } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  async upsert(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      const found = this.organizationsRepository.findById(data.id_imobzi);
      if (found) {
        return this.organizationsRepository.update(data.id_imobzi, data);
      } else {
        return this.organizationsRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
