export interface GetCreditInvoicesByPeriodDTO {
  credit_at: Date;
  paid_at: Date;
  account_credit: string;
  paid_manual: boolean;
  id_imobzi: string;
  bank_fee_value: number;
  interest_value: number;
  onlending_value: number;
  invoiceItems: Array<{ description: string; value: number }>;
  lease: {
    tenant_person: { fullname: string; cpf: string };
    tenant_org: { name: string; cnpj: string };
    id: number;
    property: {
      unit: string;
      property_block: string;
      building: { name: string; address: string };
    };
  };
}
