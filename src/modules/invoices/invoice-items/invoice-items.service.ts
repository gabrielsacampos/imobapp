import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { invoiceItemsCreateDTO } from './invoiceItemsCreate.dtos';

@Injectable()
export class InvoiceItemsService {
  constructor(private prisma: PrismaService) {}

  async create(id: string, data: invoiceItemsCreateDTO[]) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id },
    });
    if (!existsInvoice) {
      throw new NotFoundException(`Invoice Not Found`);
    }

    await this.prisma.invoice.update({
      where: { id },
      data: {
        invoiceItems: {
          createMany: { data },
        },
      },
    });

    return `${data.length} items to invoice ${id} created`;
  }

  async findByInvoiceId(id: string) {
    const found = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: true,
      },
    });

    return found.invoiceItems;
  }
}
