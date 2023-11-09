import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';

import { InvoiceItem } from './entities/invoice_item.entity';

export class InvoiceItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<InvoiceItem[]> {
    return await this.prisma.invoiceItem.findMany();
  }

  async findById(id_imobzi: string): Promise<InvoiceItem> {
    const found = await this.prisma.invoiceItem.findUnique({ where: { id_imobzi } });
    if (!found) {
      throw new NotFoundException(`item not found`);
    }
    return found;
  }
}
