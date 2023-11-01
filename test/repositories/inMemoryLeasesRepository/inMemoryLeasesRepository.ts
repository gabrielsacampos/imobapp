import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateLeaseDTO } from 'src/repository/leases/dtos/create-lease.dtos';
import { Lease } from 'src/repository/leases/entities/lease.entity';
import { LeasesRepository } from 'src/repository/leases/leases.repository';
import * as crypto from 'node:crypto';
import { inMemoryLeasesRepositoryMock } from './inMemoryLeasesRepository.mock';

export class InMemoryLeasesRepository implements Partial<LeasesRepository> {
  items: Lease[] = inMemoryLeasesRepositoryMock;

  async create(data: CreateLeaseDTO): Promise<Lease> {
    const existingLease = this.items.find((lease) => lease.id_imobzi === data.id_imobzi);
    if (existingLease) {
      throw new NotAcceptableException(`ID: ${existingLease.id_imobzi} already registered at leases.`);
    }

    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }
  async findAll(): Promise<Lease[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<Lease> {
    const found = this.items.find((lease) => lease.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at leases`);
    }
    return found;
  }

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
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
}
