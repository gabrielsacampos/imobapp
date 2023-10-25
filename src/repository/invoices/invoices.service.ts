import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { GetOnlendingsDTO, GetPaidItemDTO } from './dtos/return-invoice.queries.dtos';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: CreateInvoiceDTO) {
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

  async update(id_imobzi: string, data: CreateInvoiceDTO) {
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
    const items = data.items;
    items.forEach((item) => delete item.id_invoice_imobzi);
    delete data.items;
    try {
      await this.prisma.invoice.upsert({
        where: { id_imobzi: data.id_imobzi },
        update: data,
        create: { ...data, invoiceItems: { createMany: { data: items } } },
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
    i.id_imobzi as invoice_id, 
    ii.description, 
    ii.behavior,
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

  async getOnlendings(start_at: string, end_at: string): Promise<GetOnlendingsDTO[]> {
    const start_date = new Date(start_at);
    const end_date = new Date(end_at);

    return await this.prisma.$queryRaw`
    SELECT
    i.id_imobzi as invoice_id,
    p.cpf AS beneficiary_cpf,
    o.cnpj AS beneficiary_cnpj,
    'Repasse' as "description",
    i.onlending_value, p2.unity, b."name" as building, p2.block,
    i.account_credit
  FROM invoices AS i
  INNER JOIN leases AS l ON i.id_lease_imobzi = l.id_imobzi
  inner join properties p3 on p3.id_imobzi = l.id_property_imobzi
  LEFT JOIN beneficiaries AS b1 ON b1.id_lease_imobzi = l.id_imobzi
  LEFT JOIN people AS p ON p.id_imobzi = b1.id_beneficiary_person_imobzi
  LEFT JOIN organizations AS o ON o.id_imobzi = b1.id_beneficiary_organization_imobzi
  INNER JOIN properties AS p2 ON p2.id_imobzi = l.id_property_imobzi
  INNER JOIN buildings AS b ON b.id_imobzi = p2.id_building_imobzi
  WHERE (i.status = 'paid' OR i.status = 'partially_paid') and i.paid_at >= ${start_date} and i.paid_at <= ${end_date};`;
  }
}
