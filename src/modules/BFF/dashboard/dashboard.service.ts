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

    const invoices = { total_pending: pendingInvoices };
    const leases = {
      total: totalLeasesValue,
      count: countActiveLeases,
      ticket: leasesTicket,
      count_renew: countRenewLeases,
      count_readjustment: countReadjustmentLeases,
    };

    return { invoices, leases };
  }

  async getChartsData() {
    const buildings_revenue = await this.dashboardRepository.getBuildingsRevenue();

    return { buildings_revenue };
  }

  async getTablesData() {
    const expiring_leases = await this.dashboardRepository.getLeasesToEnd();
    const available_properties = await this.dashboardRepository.getAvailableProperties();

    return { expiring_leases, available_properties };
  }
}
