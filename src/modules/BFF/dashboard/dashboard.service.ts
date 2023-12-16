import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) { }

  async getTopCardsData() {
    const totalLeasesValue = await this.dashboardRepository.getLeasesTotalValue();
    const countActiveLeases = await this.dashboardRepository.getActiveLeasesCount();
    const leasesTicket = await this.dashboardRepository.getLeasesTicket();
    const countRenewLeases = await this.dashboardRepository.getLeasesToRenewCount();
    const countReadjustmentLeases = await this.dashboardRepository.getLeasesToReadjustmentCount();
    const pendingInvoices = await this.dashboardRepository.getPendingInvoices();

    const invoices = { totalPending: pendingInvoices };
    const leases = {
      total: totalLeasesValue,
      count: countActiveLeases,
      ticket: leasesTicket,
      countRenew: countRenewLeases,
      countReadjustment: countReadjustmentLeases,
    };

    return { invoices, leases };
  }

  async getChartsData() {
    const buildingsRevenue = this.dashboardRepository.getBuildingsRevenue();

    return { buildingsRevenue };
  }

  async getTablesData() {
    const leasesToEnd = this.dashboardRepository.getLeasesToEnd();
    const availableProperties = this.dashboardRepository.getAvailableProperties();

    return { leasesToEnd, availableProperties };
  }
}
