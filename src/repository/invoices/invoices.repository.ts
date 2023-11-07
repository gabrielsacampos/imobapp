import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ImmutableInvoice, InvoiceComponents } from 'src/3party-client/granatum/dtos/granatum-service.dtos';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';

export class InvoicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const existsInvoice = await this.prisma.invoice.findFirst({
        where: { id_imobzi: data.id_imobzi },
      });
      if (existsInvoice) {
        throw new NotAcceptableException(`Invoice ${data.id_imobzi} already exists`);
      }

      return await this.prisma.invoice.create({
        data: {
          ...data,
          invoiceItems: {
            create: data.invoiceItems,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Invoice[]> {
    try {
      return await this.prisma.invoice.findMany({ include: { invoiceItems: true } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Invoice> {
    try {
      const found = await this.prisma.invoice.findUnique({
        where: { id_imobzi },
        include: { invoiceItems: true },
      });

      if (!found) {
        throw new NotFoundException(`Invoice ${id_imobzi} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id_imobzi: string, data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const existsInvoice = await this.prisma.invoice.findFirst({
        where: { id_imobzi },
      });

      if (!existsInvoice) {
        throw new NotFoundException(`Invoice ${id_imobzi} does not exist.`);
      }

      //props able to update
      const { status, paid_at, credit_at, paid_manual, onlending_value, management_fee, account_credit } = data;

      const updatedInvoice = await this.prisma.invoice.update({
        where: { id_imobzi },
        data: {
          status,
          paid_at,
          credit_at,
          paid_manual,
          onlending_value,
          management_fee,
          account_credit,
        },
        include: { invoiceItems: true },
      });

      return updatedInvoice;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPaidInvoices(start_at: string, end_at: string): Promise<InvoiceComponents[]> {
    try {
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
    i.account_credit, 'items' as type  
    from invoices i
    inner join invoices_items ii on ii.id_invoice_imobzi = i.id_imobzi 
    inner join leases l on l.id_imobzi = i.id_lease_imobzi
    inner join properties p on p.id_imobzi = l.id_property_imobzi 
    inner join buildings b on b.id_imobzi = p.id_building_imobzi 
    WHERE (i.status = 'paid' OR i.status = 'partially_paid')
    AND  i.paid_at >= ${start_date} AND i.paid_at <= ${end_date};
    `;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOnlendings(start_at: string, end_at: string): Promise<InvoiceComponents[]> {
    try {
      const start_date = new Date(start_at);
      const end_date = new Date(end_at);

      return await this.prisma.$queryRaw`
    SELECT
    i.id_imobzi as invoice_id,
    p.cpf AS cpf,
    o.cnpj AS cnpj,
    'Repasse a beneficiário' as "description",
    i.onlending_value as value, p2.unity, b."name" as building, p2.block,
    i.account_credit, 'onlending' as type
  FROM invoices AS i
  INNER JOIN leases AS l ON i.id_lease_imobzi = l.id_imobzi
  inner join properties p3 on p3.id_imobzi = l.id_property_imobzi
  LEFT JOIN beneficiaries AS b1 ON b1.id_lease_imobzi = l.id_imobzi
  LEFT JOIN people AS p ON p.id_imobzi = b1.id_beneficiary_person_imobzi
  LEFT JOIN organizations AS o ON o.id_imobzi = b1.id_beneficiary_organization_imobzi
  INNER JOIN properties AS p2 ON p2.id_imobzi = l.id_property_imobzi
  INNER JOIN buildings AS b ON b.id_imobzi = p2.id_building_imobzi
  WHERE (i.status = 'paid' OR i.status = 'partially_paid') and i.paid_at >= ${start_date} and i.paid_at <= ${end_date};`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRevenue(start_at: string, end_at: string): Promise<InvoiceComponents[]> {
    try {
      const start_date = new Date(start_at);
      const end_date = new Date(end_at);
      return await this.prisma.$queryRaw` 
SELECT 
	revenue.invoice_id, 
	revenue.description, 
	revenue.unity, 
	revenue.building, 
	revenue.block, 
	revenue.value, 
	revenue.cpf, 
	revenue.cnpj, 
	revenue.paid_at,
	revenue.credit_at,
	revenue."type",
	revenue.account_credit,
	case
		when lease_irrf.value is null then FALSE
		when lease_irrf.value is not null then TRUE
	end as "IRRF"
FROM
	(SELECT
		i.id_imobzi AS invoice_id, 
		'Comissão de Aluguel' AS description, 
		i.account_credit,
		p3.unity, 
		b."name" AS building, 
		p3.block, 
		i.paid_at, 
		l.id_imobzi AS lease_id,
		o2.cnpj, 
		p.cpf, 
		i.credit_at,
		'revenue' as type,
		CASE 
			WHEN o2.cnpj IS NOT NULL THEN (management_fee * (o."share"/100))
			WHEN p.cpf IS NOT NULL THEN (management_fee * (o."share"/100))
		END AS value,
		CASE 
			WHEN l.id_tenant_organization_imobzi is not null then 'PJ'
			WHEN l.id_tenant_person_imobzi is not null then 'PF'
		END AS "tenant_type"
	FROM invoices AS i
  	INNER JOIN leases AS l ON i.id_lease_imobzi = l.id_imobzi
  	inner join properties p3 on p3.id_imobzi = l.id_property_imobzi
  	left join owners o on o.id_property_imobzi = p3.id_imobzi
  	left join people p on p.id_imobzi = o.id_owner_person_imobzi
  	left join organizations o2  on o2.id_imobzi = o.id_owner_organization_imobzi
  	INNER JOIN buildings AS b ON b.id_imobzi = p3.id_building_imobzi
  	WHERE (i.status = 'paid' OR i.status = 'partially_paid') and i.paid_at >= ${start_date} and i.paid_at <= ${end_date}) revenue
  	left join  
 		(select id_lease_imobzi , value, description from lease_items where description like '%IRRF%') lease_irrf
 	ON revenue.lease_id = lease_irrf.id_lease_imobzi;
`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getImmutableInvoices(): Promise<ImmutableInvoice[]> {
    try {
      return await this.prisma.$queryRaw`
    select id_imobzi as invoice_id
    from invoices
    where (
    status like '%paid%'  or status like '%expired%'
    ) and paid_manual is not true;`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
