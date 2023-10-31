import { Controller } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return await this.organizationsRepository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return this.organizationsRepository.upsert(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Organization> {
    try {
      return this.organizationsRepository.findById(id_imobzi);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Organization[]> {
    try {
      return this.organizationsRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}
