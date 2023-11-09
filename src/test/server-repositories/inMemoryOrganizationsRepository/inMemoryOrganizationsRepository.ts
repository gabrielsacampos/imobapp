import { CreateOrganizationDTO } from 'src/modules/organizations/dtos/create-organization.dtos';
import * as crypto from 'node:crypto';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { inMemoryOrganizationsRepositoryMock } from './inMemoryOrganizationsRepository.mock';
import { Organization } from 'src/modules/organizations/entities/organization.entity';
import { OrganizationsRepository } from 'src/modules/organizations/organizations.repository';
import { UpdateOrganizationDTO } from 'src/modules/organizations/dtos/update-organization.dtos';

export class InMemoryOrganizationsRepository implements Partial<OrganizationsRepository> {
  public items: Organization[] = inMemoryOrganizationsRepositoryMock;

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    const findExistingCNPJ = this.items.find((org) => org.cnpj === data.cnpj);
    if (findExistingCNPJ) {
      throw new NotAcceptableException(`CNPJ ${data.cnpj} already exisits at company: ${findExistingCNPJ.name}`);
    }
    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll() {
    return this.items;
  }

  async findExistingCNPJ(cnpj: string): Promise<Organization> {
    const found = this.items.find((org) => org.cnpj === cnpj);
    if (!found) {
      throw new NotFoundException(`CNPJ: ${cnpj} not found at organization`);
    }
    return found;
  }

  async findById(id_imobzi: string) {
    const found = this.items.find((org) => org.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at organization`);
    }
    return found;
  }

  async update(id_imobzi: string, data: UpdateOrganizationDTO): Promise<Organization> {
    const existingOrgIndex = this.items.findIndex((org) => org.id_imobzi === id_imobzi);
    const existingOrg = this.items.find((org) => org.id_imobzi === id_imobzi);

    if (existingOrgIndex === -1) {
      throw new Error(`Organization ID_IMOBZI ${id_imobzi} not found.`);
    }

    this.items[existingOrgIndex] = { id_imobzi: existingOrg.id_imobzi, ...data };
    return data;
  }
}
