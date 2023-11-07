import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { Invoice } from 'src/repository/invoices/entities/invoice.entity';
import { InvoicesRepository } from 'src/repository/invoices/invoices.repository';
import { inMemoryInvoicesRepositoryMock } from './inMemoryRepositoryInvoices.mock';
import * as crypto from 'node:crypto';

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

  async upsert(data: CreateInvoiceDTO): Promise<Invoice> {
    const existingInvoiceIndex = this.items.findIndex((invoice) => invoice.id_imobzi === data.id_imobzi);

    if (existingInvoiceIndex === -1) {
      const invoiceToCreate = data;
      invoiceToCreate.id = crypto.randomInt(1, 1000);
      this.create(invoiceToCreate);
      return invoiceToCreate;
    } else {
      const existingInvoice = this.items[existingInvoiceIndex];
      const existingInvoicenUpdated = data;
      this.items[existingInvoiceIndex] = existingInvoicenUpdated;
      return existingInvoice;
    }
  }
}
