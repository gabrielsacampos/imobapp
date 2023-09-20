import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { InvoiceDTO } from './invoices.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(data: InvoiceDTO) {
    const existsInvoice = await this.prisma.invoice.findFirst({
      where: { id: data.id },
    });

    if (existsInvoice) {
      throw new NotAcceptableException(`Invoice ${data.id} already exists`);
    }
    await this.prisma.invoice.create({ data });
    return { message: `invoice ${data.id} created.` };
  }

  async findAll() {
    const found = await this.prisma.invoice.findMany();
    return found.map((element) => {
      const lease_id = element.lease_id.toString();
      delete element.lease_id;
      return { ...element, lease_id };
    });
  }

  async findById(id: string) {
    const found = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }

    const lease_id = found.lease_id.toString();
    delete found.lease_id;

    return { lease_id, ...found };
  }

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
