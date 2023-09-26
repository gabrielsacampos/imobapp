import { IsNotEmpty } from 'class-validator';

export class ItemsInvoiceDTO {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  until_due_date: boolean;

  @IsNotEmpty()
  id_invoice_imobzi: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  behavior: string;

  @IsNotEmpty()
  include_in_dimob: boolean;

  @IsNotEmpty()
  management_fee: boolean;

  @IsNotEmpty()
  value: number;

  item_type?: string;
  due_date: string;
}
