export type InvoiceComponents = {
  type?: string;
  invoice_id?: string;
  behavior?: string;
  account_credit?: string;
  description?: string;
  value?: number;
  paid_at?: string;
  credit_at?: string;
  unity?: string;
  block?: string;
  building?: string;
  paid_manual?: boolean;
  id_category_granatum?: number;
  id_cost_center_granatum?: number;
  id_suplier_client?: number;
  cpf?: string | null;
  cnpj?: string | null;
  IRRF?: boolean;
};

export type GroupedInvoiceComponents = {
  reference?: string;
  owner_cpf?: string;
  owner_cnpj?: string;
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

