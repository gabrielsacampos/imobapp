import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { ActiveLeasesDTO, BuildingsRevenueDTO, InvoicesDTO } from './dtos/dashboard.dtos';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getActiveLeases(): Promise<ActiveLeasesDTO[]> {
    return await this.prisma.$queryRaw`
     select
	    l.code_imobzi as lease_code,
	    l.start_at as lease_start,
	    l.end_at as lease_end,
	    l.duration as lease_duration,
	    l.lease_value,
	    l.readjustment_month,
      l.status as lease_status,
      b."name" as building,
	    p.unity,
	    p.block,
	    case
		    when p3.id_imobzi is not null then 'person'
		    when o3.id_imobzi is not null then 'organization'
	    end as tenant_type,
	    case
		    when p3.id_imobzi is not null then p3.id_imobzi
		    when o3.id_imobzi is not null then o3.id_imobzi
	    end as id_tenant_imobzi,
	    case
		    when p3.id_imobzi is not null then p3.fullname
		    when o3.id_imobzi is not null then o3."name"
	    end as tenant_name
    from
	   leases l
    inner join properties p on
	    p.id_imobzi = l.id_property_imobzi
    inner join buildings b on
	    b.id_imobzi = p.id_building_imobzi
    inner join owners o on
	    o.id_property_imobzi = p.id_imobzi
    left join people p2 on
	    p2.id_imobzi = o.id_owner_person_imobzi
    left join organizations o2 on
	    o2.id_imobzi = o.id_owner_organization_imobzi
    left join people p3 on
	    p3.id_imobzi = l.id_tenant_person_imobzi
    left join organizations o3 on
	    o3.id_imobzi = l.id_tenant_organization_imobzi
    where l.status = 'active'
      ;
`;
  }

  async getInvoices(): Promise<InvoicesDTO[]> {
    return await this.prisma.$queryRaw`
    select
      i.id_imobzi as invoice_id,
	    i.total_value as invoice_total_value,
	    i.status as invoice_status,
	    i.due_date as invoice_due_date,
      i.paid_at as invoice_paid_at,
      i.credit_at as invoice_credit_at,
      b."name" as building,
	    p.unity,
	    p.block,
	    case
		    when p3.id_imobzi is not null then 'person'
		    when o3.id_imobzi is not null then 'organization'
	    end as tenant_type,
	    case
		    when p3.id_imobzi is not null then p3.id_imobzi
		    when o3.id_imobzi is not null then o3.id_imobzi
	    end as id_tenant_imobzi,
	    case
		    when p3.id_imobzi is not null then p3.fullname
		    when o3.id_imobzi is not null then o3."name"
	    end as tenant_name
    from
	    invoices i
    inner join leases l on
	    l.id_imobzi = i.id_lease_imobzi
    inner join properties p on
	    p.id_imobzi = l.id_property_imobzi
    inner join buildings b on
	    b.id_imobzi = p.id_building_imobzi
    inner join owners o on
	    o.id_property_imobzi = p.id_imobzi
    left join people p2 on
	    p2.id_imobzi = o.id_owner_person_imobzi
    left join organizations o2 on
	    o2.id_imobzi = o.id_owner_organization_imobzi
    left join people p3 on
	    p3.id_imobzi = l.id_tenant_person_imobzi
    left join organizations o3 on
	    o3.id_imobzi = l.id_tenant_organization_imobzi;
    `;
  }

  async getBuildingsRevenue(): Promise<BuildingsRevenueDTO[]> {
    return await this.prisma.$queryRaw`
SELECT 
    b.name AS building,
    TO_CHAR(i.paid_at, 'MM/YYYY') AS payment_period,
      ROUND(SUM(i.total_value)) AS total_value
FROM 
    invoices i
INNER JOIN 
    leases l ON l.id_imobzi = i.id_lease_imobzi 
INNER JOIN 
    properties prop ON prop.id_imobzi = l.id_property_imobzi 
INNER JOIN 
    buildings b ON b.id_imobzi = prop.id_building_imobzi
WHERE 
    i.status LIKE '%paid%'
GROUP BY 
    b.name, TO_CHAR(i.paid_at, 'MM/YYYY')
ORDER BY   TO_CHAR(i.paid_at, 'MM/YYYY');
`;
  }
}
