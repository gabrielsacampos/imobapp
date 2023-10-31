import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService implements Partial<OrganizationsRepository> {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  async findExistingCNPJ(cnpj: string): Promise<Organization> {
    try {
      return this.organizationsRepository.findExistingCNPJ(cnpj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      const findExistingCNPJ = await this.findExistingCNPJ(data.cnpj);
      if (findExistingCNPJ)
        throw new NotAcceptableException(`CNPJ ${data.cnpj} already exisits at company: ${findExistingCNPJ.name}`);
      return this.organizationsRepository.create(data);
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
    return this.organizationsRepository.findById(id_imobzi);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.findAll();
  }
}
