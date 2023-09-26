import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InvoiceDTO } from './invoicesCreate.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: InvoiceDTO) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id_imobzi: data.id_imobzi },
    });

    if (existsInvoice) {
      throw new NotAcceptableException(`Invoice ${data.id_imobzi} already exists`);
    }

    const items = data.items;
    delete data.items;

    await this.prisma.invoice.create({
      data: {
        ...data,
        invoiceItems: { create: items },
      },
    });
    return { message: `invoice ${data.id_imobzi} created.` };
  }

  async findAll() {
    return await this.prisma.invoice.findMany();
  }

  async findById(id_imobzi: string) {
    const found = await this.prisma.invoice.findUnique({
      where: { id_imobzi },
      include: { invoiceItems: true },
    });

    if (!found) {
      throw new NotFoundException(`Invoice ${id_imobzi} not found`);
    }

    return found;
  }

  async update(id_imobzi: string, data: InvoiceDTO) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id_imobzi },
    });

    if (!existsInvoice) {
      throw new NotFoundException(`Invoice ${id_imobzi} does not exist.`);
    }

    await this.prisma.invoice.update({
      where: { id_imobzi },
      data: {
        ...data,
        invoiceItems: {
          deleteMany: [{ id_invoice_imobzi: id_imobzi }],
          createMany: { data: data.items },
        },
      },
    });

    return { message: `invoice ${id_imobzi} updated` };
  }
}
