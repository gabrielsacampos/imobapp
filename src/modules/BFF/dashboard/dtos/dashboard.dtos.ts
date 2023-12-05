export class DashboardRequiredDataDTO {
  invoice_id: string;
  invoice_value_shared: number;
  invoice_total_value: number;
  building: string;
  unity: string;
  block: string;
  invoice_status: string;
  invoice_due_date: Date;
  lease_start: Date;
  lease_end: Date;
  lease_duration: number;
  lease_value_shared: number;
  lease_value: number;
  lease_code: string;
  lease_status: string;
  readjusment_month: number;
  owner_type: string;
  id_owner_imobzi: string;
  owner_name: string;
  tenant_type: string;
  id_tenant_imobzi: string;
  tenant_name: string;
}

export class DistinctsInvoicesDTO {
  invoice_id: string;
  invoice_value_shared: number;
  invoice_total_value: number;
  building: string;
  unity: string;
  block: string;
  invoice_status: string;
  invoice_due_date: Date;
  tenant_type: string;
  id_tenant_imobzi: string;
  tenant_name: string;
}

export class DistinctLeasesDTO {
  lease_code: string;
  lease_value: number;
  lease_start: Date;
  lease_end: Date;
  lease_duration: number;
  readjusment_month: number;
  id_owner_imobzi: string;
  owner_name: string;
  owner_type: string;
  id_tenant_imobzi: string;
  tenant_name: string;
  tenant_type: string;
  building: string;
  unity: string;
  block: string;
  lease_status: string;
}

export class TopCardsDTO {
  leases_active_count: number;
  leases_active_total_value: string;
  leases_active_ticket: number;
  leases_count_renew: number;
  leases_count_readjust: number;
  invoices_pending_total_value: string;
}

export class ChartRevenueDTO {
  data: any | ChartRevenueProps[];
}

export class ChartRevenueProps {
  month: string;
}
