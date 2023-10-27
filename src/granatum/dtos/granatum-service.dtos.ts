export type InvoiceComponents = {
  type: string;
  invoice_id: string;
  account_credit: string;
  description: string;
  value: number;
  paid_at: string;
  credit_at: string;
  unity: string;
  block: string;
  building: string;
  paid_manual?: boolean;
  id_category_granatum?: number;
  id_cost_center_granatum?: number;
  id_suplier_client?: number;
  cpf?: string;
  cnpj?: string;
  IRRF?: boolean;
};

export type GroupedInvoiceComponents = {
  type: string;
  paid_at: string;
  credit_at: string;
  account_credit: string;
  description: string;
  items: InvoiceComponents[];
  id_account_granatum: number;
};

export type InvoicesComponentsGroups = {
  groupedItems: GroupedInvoiceComponents[];
  groupedOnlendings: GroupedInvoiceComponents[];
  groupedRevenues: GroupedInvoiceComponents[];
};

export type ImmutableInvoice = {
  invoice_id: string;
};
