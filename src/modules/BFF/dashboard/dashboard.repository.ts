import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { DashboardRequiredDataDTO } from './dtos/dashboard.dtos';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) { }

  

  async getDashboardRequiredData(): Promise<DashboardRequiredDataDTO[]> {
    return await this.prisma.$queryRaw`
    select
      i.id_imobzi as invoice_id,
	    (i.total_value *(o."share" / 100)) as invoice_value_shared,
	    i.total_value as invoice_total_value,
	    i.status as invoice_status,
	    i.due_date as invoice_due_date,
      (l.lease_value *(o."share" / 100)) as lease_value_shared,
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
		    when p2.id_imobzi is not null then 'person'
		    when o2.id_imobzi is not null then 'organization'
	    end as owner_type,
	    case
		    when p2.id_imobzi is not null then p2.id_imobzi
		    when o2.id_imobzi is not null then o2.id_imobzi
	    end as id_owner_imobzi,
	    case
		    when p2.id_imobzi is not null then p2.fullname
		    when o2.id_imobzi is not null then o2."name"
	    end as owner_name,
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
}
