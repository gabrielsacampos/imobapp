import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class FinancesRepository {
	constructor(private readonly prisma: PrismaService) { }

	async getPaidItems() {
		return await this.prisma.$queryRaw`
		select i.id_imobzi, l.code_imobzi ,i.paid_at, i.credit_at, ii.description , ii.behavior, (ii.value*(ow."share"/100)) as item_value, ppl.fullname as pf_owner, org."name" as org_owner, ii.include_in_dimob, concat(b."name", ' - ', prop.unity, ' - ', prop.block) ,
case
	when ii.include_in_dimob = true then l.fee
end as "fee",
case
	when ii.include_in_dimob = true then ROUND(((ii.value*(ow."share"/100))*(l.fee/100))::numeric, 2)
end as "teste"
from invoices i 
inner join invoices_items ii on i.id_imobzi = ii.id_invoice_imobzi 
inner join leases l on l.id_imobzi = i.id_lease_imobzi 
inner join properties prop on prop.id_imobzi = l.id_property_imobzi 
inner join buildings b on b.id_imobzi = prop.id_building_imobzi 
inner join owners ow on ow.id_property_imobzi = prop.id_imobzi 
left join people ppl on ppl.id_imobzi = ow.id_owner_person_imobzi 
left join organizations org on org.id_imobzi = ow.id_owner_organization_imobzi
where paid_at >= '2023-10-30' and paid_at < '2023-12-01' and behavior = 'charge_tenant_and_onlend'
;
		`;
	}
}
