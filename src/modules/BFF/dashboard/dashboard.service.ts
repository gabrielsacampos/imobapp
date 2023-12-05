import { getMonth } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { add, differenceInDays } from 'date-fns';
import { DashboardRequiredDataDTO, DistinctLeasesDTO, DistinctsInvoicesDTO, TopCardsDTO } from './dtos/dashboard.dtos';
import { limitDaysPendingInvoices } from '../constants/contants';

@Injectable()
export class DashboardService {
  constructor(private readonly commonRepository: DashboardRepository) { }

  getDistinctsActiveLeases(dashboardRequiredData: DashboardRequiredDataDTO[]): DistinctLeasesDTO[] {
    return dashboardRequiredData.reduce((acc, curr) => {
      const leaseAlreadyStored = acc.some((item) => {
        return item.lease_code === curr.lease_code;
      });
      if (!leaseAlreadyStored && curr.lease_status === 'active') {
        const {
          lease_code,
          lease_value,
          lease_start,
          lease_end,
          lease_duration,
          readjusment_month,
          id_owner_imobzi,
          owner_name,
          owner_type,
          id_tenant_imobzi,
          tenant_name,
          tenant_type,
          building,
          unity,
          block,
          lease_status,
        } = curr;

        acc.push({
          lease_code,
          lease_value,
          lease_start,
          lease_end,
          lease_duration,
          readjusment_month,
          id_owner_imobzi,
          owner_name,
          owner_type,
          id_tenant_imobzi,
          tenant_name,
          tenant_type,
          building,
          unity,
          block,
          lease_status,
        });
      }

      return acc;
    }, []);
  }

  getDistinctsInvoices(dashboardRequiredData: DashboardRequiredDataDTO[]): DistinctsInvoicesDTO[] {
    return dashboardRequiredData.reduce((acc, curr) => {
      const invoiceAlreadyStored = acc.some((item) => {
        return item.invoice_id === curr.invoice_id;
      });
      if (!invoiceAlreadyStored) {
        const {
          invoice_id,
          invoice_total_value,
          invoice_due_date,
          invoice_status,
          building,
          unity,
          block,
          tenant_type,
          tenant_name,
          id_tenant_imobzi,
        } = curr;

        acc.push({
          invoice_id,
          invoice_total_value,
          invoice_due_date,
          invoice_status,
          building,
          unity,
          block,
          tenant_type,
          tenant_name,
          id_tenant_imobzi,
        });
      }

      return acc;
    }, []);
  }

  getTopCardsData(dashboardRequiredData: DashboardRequiredDataDTO[]): TopCardsDTO {
    const localDate = add(new Date(), { hours: 3 });
    const currentMonth = getMonth(localDate);

    const distinctedInvoices = this.getDistinctsInvoices(dashboardRequiredData);
    const distinctsActiveLeases = this.getDistinctsActiveLeases(dashboardRequiredData);

    const leases_active_count = distinctsActiveLeases.length;
    const leasesTotalValue = distinctsActiveLeases.reduce((acc, curr) => {
      return (acc += curr.lease_value);
    }, 0);

    const leases_active_ticket = leasesTotalValue / leases_active_count;

    const leases_count_readjust = distinctsActiveLeases.reduce((acc, curr) => {
      if (curr.readjusment_month === currentMonth) {
        acc += 1;
      }

      return acc;
    }, 0);

    const leases_count_renew = distinctsActiveLeases.reduce((acc, curr) => {
      if (curr.readjusment_month === currentMonth) {
        acc += 1;
      }

      return acc;
    }, 0);

    const pendingInvoices = distinctedInvoices.filter((invoice) => {
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

    const leases_active_total_value: string = leasesTotalValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const invoices_pending_total_value: string = pendingInvoicesTotal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      leases_active_ticket,
      leases_active_count,
      leases_count_readjust,
      leases_count_renew,
      leases_active_total_value,
      invoices_pending_total_value,
    };
  }

  async getDashboardData() {
    const dashboardRequiredData = await this.commonRepository.getDashboardRequiredData();
    const topCardsData = this.getTopCardsData(dashboardRequiredData);
    return { topCardsData };
  }
}
