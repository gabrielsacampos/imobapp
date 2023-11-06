export class InvoiceItem {
  id?: string;
  id_imobzi?: string;
  id_invoice_imobzi: string;
  until_due_date: boolean;
  item_type?: string;
  description: string;
  behavior: string;
  include_in_dimob: boolean;
  charge_management_fee: boolean;
  value: number;
  created_at?: Date;
  updated_at?: Date;
}
