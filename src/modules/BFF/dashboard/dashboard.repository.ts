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
    return await this.prisma.$queryRaw`

    `;
  }

  // charts
  async getBuildingsRevenue() { }

  // tables
  async getLeasesToEnd() { }

  async getAvailableProperties() {
    return await this.prisma
      .$queryRaw`select name, unity, p.block, bedroom, rental_value from properties p inner join buildings b on b.id_imobzi = p.id_building_imobzi where status = 'available';`;
  }
}
