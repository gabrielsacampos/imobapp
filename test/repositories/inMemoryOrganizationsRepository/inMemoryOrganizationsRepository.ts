import { CreateOrganizationDTO } from 'src/repository/organizations/dtos/create-organization.dtos';
import * as crypto from 'node:crypto';
import { NotFoundException } from '@nestjs/common';
import { inMemoryOrganizationsRepositoryMock } from './inMemoryOrganizationsRepository.mock';
import { Organization } from 'src/repository/organizations/entities/organization.entity';
import { OrganizationsRepository } from 'src/repository/organizations/organizations.repository';

export class InMemoryOrganizationsRepository implements Partial<OrganizationsRepository> {
  public items: Organization[] = inMemoryOrganizationsRepositoryMock;

  async create(data: CreateOrganizationDTO) {
    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll() {
    return this.items;
  }

  async findExistingCNPJ(cnpj: string): Promise<Organization> {
    const found = this.items.find((person) => person.cnpj === cnpj);
    if (!found) {
      throw new NotFoundException(`CNPJ: ${cnpj} not found at organization`);
    }
    return found;
  }

  async findById(id_imobzi: string) {
    const found = this.items.find((person) => person.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at organization`);
    }
    return found;
  }

  async upsert(data: CreateOrganizationDTO) {
    const existingOrganizationIndex = this.items.findIndex((person) => person.id_imobzi === data.id_imobzi);

    if (existingOrganizationIndex === -1) {
      const personToCreate = data;
      personToCreate.id = crypto.randomInt(1, 1000);
      this.create(personToCreate);
      return personToCreate;
    } else {
      const existingOrganization = this.items[existingOrganizationIndex];
      const existingOrganizationUpdated = data;
      this.items[existingOrganizationIndex] = existingOrganizationUpdated;
      return existingOrganization;
    }
  }

  async update(id_imobzi: string, data: CreateOrganizationDTO) {
    const existingOrganizationIndex = this.items.findIndex((person) => person.id_imobzi === id_imobzi);

    if (existingOrganizationIndex === -1) {
      throw new Error(`Organization ID_IMOBZI ${id_imobzi} not found.`);
    } else {
      const existingOrganization = this.items[existingOrganizationIndex];
      const existingOrganizationUpdated = data;
      this.items[existingOrganizationIndex] = existingOrganizationUpdated;
      return existingOrganization;
    }
  }
}
