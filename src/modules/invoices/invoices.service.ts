import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InvoiceDTO } from './invoices.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: InvoiceDTO) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id: data.id_imobzi },
    });

    if (existsInvoice) {
      throw new NotAcceptableException(`Invoice ${data.id_imobzi} already exists`);
    }
    await this.prisma.invoice.create({ data });
    return { message: `invoice ${data.id_imobzi} created.` };
  }

  async findAll() {
    return await this.prisma.invoice.findMany();
  }

  async findById(id: string) {
    const found = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }

    return found;
  }

  // update using db id.
  async update(id: string, data: InvoiceDTO) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id },
    });

    if (!existsInvoice) {
      throw new NotFoundException(`Invoice ${id} does not exist.`);
    }

    console.log(data);
    await this.prisma.invoice.update({
      where: { id },
      data: { id: id, ...data },
    });

    return { message: `invoice ${id} updated` };
  }
}
