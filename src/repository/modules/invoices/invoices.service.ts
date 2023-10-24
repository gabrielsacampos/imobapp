import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GetPaidItemDTO } from './dtos/return-invoice.queries.dtos';
import { CreateInvoiceDTO, InvoiceCreateDTO } from './dtos/create-invoice.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: InvoiceCreateDTO) {
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

  async update(id_imobzi: string, data: InvoiceCreateDTO) {
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
      },
      include: { invoiceItems: true },
    });

    return { message: `invoice ${id_imobzi} updated` };
  }

  async upsert(data: CreateInvoiceDTO) {
    try {
      await this.prisma.invoice.upsert({
        where: { id_imobzi: data.id_imobzi },
        update: data,
        create: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPaidItems(start_at: string, end_at: string): Promise<GetPaidItemDTO[]> {
    const start_date = new Date(start_at);
    const end_date = new Date(end_at);

    return await this.prisma.$queryRaw`
    select 
    i.id_imobzi, 
    ii.description, 
    ii.value, 
    i.paid_at, 
    i.credit_at, 
    p.unity, 
    p.block, 
    b."name" as building, 
    i.paid_manual,
    i.account_credit  
    from invoices i
    inner join invoices_items ii on ii.id_invoice_imobzi = i.id_imobzi 
    inner join leases l on l.id_imobzi = i.id_lease_imobzi
    inner join properties p on p.id_imobzi = l.id_property_imobzi 
    inner join buildings b on b.id_imobzi = p.id_building_imobzi 
    WHERE (i.status = 'paid' OR i.status = 'partially_paid')
    AND  i.paid_at >= ${start_date} AND i.paid_at <= ${end_date};
    `;
  }
}
