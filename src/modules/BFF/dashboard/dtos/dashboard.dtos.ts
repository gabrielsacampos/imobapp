export class ActiveLeasesDTO {
  building: string;
  unity: string;
  block: string;
  lease_start: Date;
  lease_end: Date;
  lease_duration: number;
  lease_value: number;
  lease_code: string;
  lease_status: string;
  readjusment_month: number;
  tenant_type: string;
  id_tenant_imobzi: string;
  tenant_name: string;
}

export class InvoicesDTO {
  invoice_id: string;
  invoice_total_value: number;
  invoice_status: string;
  invoice_due_date: Date;
  invoice_paid_at: Date;
  invoice_credit_at: Date;
  tenant_type: string;
  id_tenant_imobzi: string;
  tenant_name: string;
  building: string;
  unity: string;
  block: string;
}

export class BuildingsRevenueDTO {
  building: string;
  payment_period: string;
  total_value: number;
}

export class TopCardsDTO {
  leasesActiveCount: number;
  leasesTotalValueString: string;
  leasesTicketString: string;
  leasesRenewCount: number;
  leasesReadjustmentCount: number;
  invoicesTotalPendingString: string;
}

export class ChartRevenueDTO {
  data: any | ChartRevenueProps[];
}

export class ChartRevenueProps {
  month: string;
}
