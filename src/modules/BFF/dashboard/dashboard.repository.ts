import { getMonth, getYear } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { } from './entities/entities';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) { }

  // topcards
  async getLeasesTotalValue() {
    const activeLeases = await this.prisma.lease.findMany({ where: { status: 'active' } });
    return activeLeases.reduce((acc, curr) => (acc += curr.lease_value), 0);
  }

  async getActiveLeasesCount() {
    const activeLeases = await this.prisma.lease.findMany({ where: { status: 'active' } });
    return activeLeases.length;
  }

  async getLeasesTicket() {
    const activeLeases = await this.prisma.lease.findMany({ where: { status: 'active' } });
    const totalValue = activeLeases.reduce((acc, curr) => (acc += curr.lease_value), 0);
    return totalValue / activeLeases.length;
  }

  async getLeasesToReadjustmentCount() {
    const currentMonth = getMonth(new Date());
    const leasesToReadjust: [] = await this.prisma
      .$queryRaw`select * from leases where readjustment_month = ${currentMonth} and status = 'active';`;

    return leasesToReadjust.length;
  }

  async getLeasesToRenewCount() {
    const currentMonth = getMonth(new Date());
    const currentYear = getYear(new Date());

    const leasesToRenew: [] = await this.prisma.$queryRaw`
    select * from leases 
    where extract(year from end_at) = ${currentYear} and (extract(month from end_at) -1) = ${currentMonth} and status = 'active';
    `;

    return leasesToRenew.length;
  }

  async getPendingInvoices() {
    const result: any[] = await this.prisma.$queryRaw`
      select sum(total_value) from invoices WHERE (status = 'pending' OR status = 'expired') AND EXTRACT(DAY FROM (current_date - due_date)) > 45;
    `;

    return result[0].sum;
  }

  // charts
  async getBuildingsRevenue() {
    return await this.prisma.$queryRaw`SELECT
    b.name AS building,
   TO_CHAR(DATE_TRUNC('month', i.paid_at), 'YYYY/MM')  AS payment_month,
    SUM(i.total_value) AS total
FROM
    invoices i
INNER JOIN leases l ON l.id_imobzi = i.id_lease_imobzi
INNER JOIN properties prop ON prop.id_imobzi = l.id_property_imobzi
INNER JOIN buildings b ON b.id_imobzi = prop.id_building_imobzi
WHERE
    i.status LIKE '%paid%' AND i.paid_at < DATE_TRUNC('month', CURRENT_DATE)
GROUP BY
    building,
    payment_month
 order by payment_month;`;
  }

  // tables
  async getLeasesToEnd() {
    return await this.prisma.$queryRaw`select 
    l.code_imobzi as code,
     b."name" as building, 
     prop.bedroom as rooms, 
     prop.unity , 
     prop.block , 
     l.lease_value,
     case 
       when EXTRACT(DAY FROM (end_at - current_date)) >= 0 then 'expiring'
       when EXTRACT(DAY FROM (end_at - current_date)) < 0 then 'expired'
     end as obs,
     case 
       when ppl.fullname is not null then ppl.fullname
       when org.name is not null then org.name
     end as tenant_name
     , TO_CHAR(end_at, 'YYYY-MM-DD') as end_at from leases l 
   inner join properties prop on l.id_property_imobzi  = prop.id_imobzi 
   inner join buildings b on b.id_imobzi = prop.id_building_imobzi 
   left join people ppl on ppl.id_imobzi  = l.id_tenant_person_imobzi 
   left join organizations org on org.id_imobzi = l.id_tenant_organization_imobzi 
   where l.status = 'active' and EXTRACT(DAY FROM (end_at - current_date)) <= 60;
   `;
  }

  async getAvailableProperties() {
    return await this.prisma
      .$queryRaw`select name as building, unity, p.block, bedroom as rooms, rental_value from properties p inner join buildings b on b.id_imobzi = p.id_building_imobzi where status = 'available';`;
  }
}
