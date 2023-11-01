import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { Invoice } from 'src/repository/invoices/entities/invoice.entity';
import { InvoicesRepository } from 'src/repository/invoices/invoices.repository';
import { inMemoryInvoicesRepositoryMock } from './inMemoryRepositoryInvoices.mock';
import * as crypto from 'node:crypto';

export class InMemoryInvoicesRepository implements Partial<InvoicesRepository> {
  items: Invoice[] = inMemoryInvoicesRepositoryMock;

  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    const existingLease = this.items.find((lease) => lease.id_imobzi === data.id_imobzi);
    if (existingLease) {
      throw new NotAcceptableException(`ID: ${existingLease.id_imobzi} already registered at leases.`);
    }

    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }
  async findAll(): Promise<Invoice[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<Invoice> {
    const found = this.items.find((lease) => lease.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at leases`);
    }
    return found;
  }

  async upsert(data: CreateInvoiceDTO): Promise<Invoice> {
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
