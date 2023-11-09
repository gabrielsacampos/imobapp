import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CreateInvoiceDTO } from 'src/modules/invoices/dtos/create-invoice.dtos';
import { Invoice } from 'src/modules/invoices/entities/invoice.entity';
import { InvoicesRepository } from 'src/modules/invoices/invoices.repository';
import { inMemoryInvoicesRepositoryMock } from './inMemoryRepositoryInvoices.mock';

export class InMemoryInvoicesRepository implements Partial<InvoicesRepository> {
  items: Invoice[] = inMemoryInvoicesRepositoryMock;

  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    const existingLease = this.items.find((invoice) => invoice.id_imobzi === data.id_imobzi);
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
    const found = this.items.find((invoice) => invoice.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at leases`);
    }
    return found;
  }

  async update(id_imobzi: string, data: CreateInvoiceDTO): Promise<Invoice> {
    const foundIndex = this.items.findIndex((invoice) => invoice.id_imobzi === id_imobzi);
    const foundInvoice = this.items.find((invoice) => invoice.id_imobzi === id_imobzi);

    if (foundIndex === -1) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at leases`);
    }

    this.items[foundIndex] = { id: foundInvoice.id, ...data };
    return data;
  }
}
