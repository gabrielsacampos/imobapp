import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateInvoiceItemDto } from './dto/create-invoice_item.dto';

import { InvoiceItem } from './entities/invoice_item.entity';

export class InvoiceItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInvoiceItemDto): Promise<InvoiceItem> {
    try {
      const found = await this.prisma.invoiceItem.findFirst({ where: { id_imobzi: data.id_imobzi } });
      if (found) {
        throw new NotAcceptableException(`item ${data.id_imobzi} already exists`);
      }
      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<InvoiceItem[]> {
    try {
      return await this.prisma.invoiceItem.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<InvoiceItem> {
    try {
      const found = await this.prisma.invoiceItem.findUnique({ where: { id_imobzi } });
      if (!found) {
        throw new NotFoundException(`item not found`);
      }
      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateInvoiceItemDto): Promise<InvoiceItem> {
    try {
      return await this.prisma.invoiceItem.upsert({
        where: { id_imobzi: data.id_imobzi },
        update: data,
        create: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
