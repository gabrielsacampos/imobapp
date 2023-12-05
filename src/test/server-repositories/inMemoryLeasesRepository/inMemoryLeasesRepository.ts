import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateLeaseDTO } from 'src/modules/entities/leases/dtos/create-lease.dtos';
import { Lease } from 'src/modules/entities/leases/entities/lease.entity';
import { LeasesRepository } from 'src/modules/entities/leases/leases.repository';
import * as crypto from 'node:crypto';
import { inMemoryLeasesRepositoryMock } from './inMemoryLeasesRepository.mock';

export class InMemoryLeasesRepository implements Partial<LeasesRepository> {
  items: CreateLeaseDTO[] = inMemoryLeasesRepositoryMock;

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

  async update(id_imobzi: string, data: CreateLeaseDTO): Promise<Lease> {
    const existingLeaseIndex = this.items.findIndex((lease) => lease.id_imobzi === id_imobzi);
    const existingLease = this.items.find((lease) => lease.id_imobzi === id_imobzi);

    if (!existingLease) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at leases`);
    }

    this.items[existingLeaseIndex] = { id: existingLease.id, ...data };
    return data;
  }
}
