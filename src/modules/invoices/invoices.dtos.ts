import { IsNotEmpty } from 'class-validator';

export class InvoiceDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  due_date: string;

  @IsNotEmpty()
  management_fee: number;

  @IsNotEmpty()
  invoice_url: string;

  @IsNotEmpty()
  total_value: number;

  @IsNotEmpty()
  interest_value: number;

  @IsNotEmpty()
  lease_id: bigint;

  barcode?: string;
  bank_slip_url?: string;
  bank_slip_id?: string;
  paid_at?: string;
  credit_at?: string;
  paid_manual?: boolean;
  bank_fee_value?: number;
  account_credit?: string;
  onlending_value?: number;
  reference?: string;
}
