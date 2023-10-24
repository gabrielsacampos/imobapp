import { GetPaidItemDTO } from 'src/repository/invoices/dtos/return-invoice.queries.dtos';

export interface GroupItems {
  count_invoices: number;
  paid_at: string;
  credit_at: string;
  account_credit: string;
  description: string;
  items: GetPaidItemDTO[];
}
