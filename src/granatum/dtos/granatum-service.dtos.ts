export class GetPaidItemDTO {
  invoice_id: string;
  behavior: string;
  account_credit: string;
  description: string;
  value: number;
  paid_at: string;
  credit_at: string;
  unity: string;
  block: string;
  building: string;
  paid_manual?: boolean;
}

export class GetOnlendingsDTO {
  beneficiary_cpf?: string;
  beneficiary_cnpj?: string;
  invoice_id: string;
  account_credit: string;
  description: string;
  onlending_value: number;
  unity: string;
  building: string;
  block: string;
}

export class GroupedItemsDTO {
  type: string;
  count_invoices: number;
  paid_at: string;
  credit_at: string;
  account_credit: string;
  description: string;
  items: GetPaidItemDTO[];
}

export class GroupedOnlendingsDTO {
  type: string;
  count_invoices: number;
  account_credit: string;
  description: string;
  items: GetOnlendingsDTO[];
}

export class GetInvoicesComponentsDTO {
  groupedItems: GroupedItemsDTO[];
  groupedOnlendings: GroupedOnlendingsDTO[];
}
