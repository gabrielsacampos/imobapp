import { getMonth } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { add, differenceInDays } from 'date-fns';
import { ActiveLeasesDTO, BuildingsRevenueDTO, InvoicesDTO, TopCardsDTO } from './dtos/dashboard.dtos';
import { limitDaysPendingInvoices } from '../constants/contants';

@Injectable()
export class DashboardService {
  constructor(private readonly commonRepository: DashboardRepository) { }

  async getDashboardData() {
    const invoices = await this.commonRepository.getInvoices();
    const activeLeases = await this.commonRepository.getActiveLeases();
    const buildingRevenue = await this.commonRepository.getBuildingsRevenue();

    const buildingsRevenueChartData = this.getBuildingRevenueChart(buildingRevenue);
    const topCardsData = this.getTopCardsData(activeLeases, invoices);

    return { topCardsData, buildingsRevenueChartData };
  }

  getTopCardsData(activeLeases: ActiveLeasesDTO[], invoices: InvoicesDTO[]): TopCardsDTO {
    const localDate = add(new Date(), { hours: 3 });
    const currentMonth = getMonth(localDate);

    const leasesTotalValue = activeLeases.reduce((acc, curr) => {
      return (acc += curr.lease_value);
    }, 0);

    const leasesActiveCount = activeLeases.length;

    const leasesTicket = leasesTotalValue / leasesActiveCount;

    const leasesReadjustmentCount = activeLeases.reduce((acc, curr) => {
      if (curr.readjusment_month === currentMonth) {
        acc += 1;
      }

      return acc;
    }, 0);

    const leasesRenewCount = activeLeases.reduce((acc, curr) => {
      if (curr.readjusment_month === currentMonth) {
        acc += 1;
      }

      return acc;
    }, 0);

    const pendingInvoices = invoices.filter((invoice) => {
      return (
        (invoice.invoice_status === 'pending' || invoice.invoice_status === 'expired') &&
        invoice.invoice_due_date < new Date()
      );
    });

    const pendingInvoicesTotal = pendingInvoices.reduce((acc, curr) => {
      const daysLeft = differenceInDays(new Date(), curr.invoice_due_date);

      if (daysLeft > limitDaysPendingInvoices) {
        return (acc += curr.invoice_total_value);
      }

      return acc;
    }, 0);

    const leasesTotalValueString: string = leasesTotalValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const invoicesTotalPendingString: string = pendingInvoicesTotal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const leasesTicketString: string = leasesTicket.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      leasesActiveCount,
      leasesTotalValueString,
      leasesTicketString,
      leasesRenewCount,
      leasesReadjustmentCount,
      invoicesTotalPendingString,
    };
  }

  getBuildingRevenueChart(buildingRevenue: BuildingsRevenueDTO[]) {
    const grouped = buildingRevenue.reduce((acc, curr) => {
      const { building, total_value, payment_period: monthRef } = curr;

      if (acc[monthRef]) {
        acc[monthRef][building] = total_value;
      } else {
        acc[monthRef] = {
          month: monthRef,
          [curr.building]: total_value,
        };
      }

      return acc;
    }, {});

    const buildings = buildingRevenue.reduce((acc, curr) => {
      if (!acc.includes(curr.building)) {
        acc.push(curr.building);
      }

      return acc;
    }, []);

    const groupedToChart = Object.values(grouped);

    return { groupedToChart, buildings };
  }
}
