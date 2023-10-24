export class Invoice {
  id_imobzi: string;
  status: string;
  reference_start_at?: string;
  reference_end_at?: string;
  due_date: Date;
  id_lease_imobzi: string;

  management_fee: number;
  invoice_url: string;
  barcode?: string;
  bank_slip_url?: string;
  bank_slip_id?: string;
  total_value: number;
  paid_at?: Date;
  credit_at?: Date;
  paid_manual?: boolean;
  account_credit?: string;
  onlending_value?: number;
}
