import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InvoiceCreateDTO } from './invoicesCreate.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: InvoiceCreateDTO) {
    // const existsInvoice = await this.prisma.invoice.findFirst({
    //   where: { id_imobzi: data.id_imobzi },
    // });
    // if (existsInvoice) {
    //   throw new NotAcceptableException(`Invoice ${data.id_imobzi} already exists`);
    // }
    // const items = data.items;
    // delete data.items;

    // await this.prisma.invoice.create({
    //   data: {
    //     ...data,
    //     invoiceItems: { create: items },
    //   },
    // });
    // return { message: `invoice ${data.id_imobzi} created.` };
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

  async getInvoicesSimpleData(start_at: string, end_at: string): Promise<any[]> {
    const start_date = new Date(start_at);
    const end_date = new Date(end_at);

    return await this.prisma.$queryRaw`
    SELECT 
    i.id_imobzi,
    i.account_credit,
    i.credit_at,
    i.paid_at,
    i.paid_manual,
    i.bank_fee_value,
    i.management_fee  AS fee,
    i.total_value,
    l.code_imobzi AS lease_code,
    p2.unity,
    p2.block,
    b."name" AS building_name
    FROM invoices AS i
    INNER JOIN leases AS l ON i.id_lease_imobzi = l.id_imobzi
    INNER JOIN properties AS p2 ON p2.id_imobzi = l.id_property_imobzi
    INNER JOIN buildings AS b ON b.id_imobzi = p2.id_building_imobzi 
    WHERE (i.status = 'paid' OR i.status = 'partially_paid') and i.credit_at  >= ${start_date} and i.credit_at <= ${end_date};
    `;
  }

  async getItemsPaid(start_at: string, end_at: string): Promise<any[]> {
    const start_date = new Date(start_at);
    const end_date = new Date(end_at);

    return await this.prisma.$queryRaw`
      select 
      i.id_imobzi as id_invoice,
      ii.description, ii.value as value_item,
      p.unity as property_unity, p.block, b."name" as building
      from invoices as i
      inner join invoices_items ii on ii.id_invoice_imobzi = i.id_imobzi
      inner join leases l on l.id_imobzi = i.id_lease_imobzi 
      inner join properties p on p.id_imobzi = l.id_property_imobzi
      inner join buildings b on p.id_building_imobzi = b.id_imobzi
      WHERE (i.status = 'paid' OR i.status = 'partially_paid') and i.credit_at >= ${start_date} and i.credit_at <= ${end_date};
    `;
  }
}
