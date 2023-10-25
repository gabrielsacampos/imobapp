import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InvoiceItem } from '../entities/invoiceItems.entity';

export class CreateInvoiceItemDTO extends InvoiceItem {
  @IsNotEmpty()
  @IsString()
  id_imobzi: string;

  @IsNotEmpty()
  @IsString()
  id_invoice_imobzi: string;

  @IsNotEmpty()
  @IsBoolean()
  until_due_date: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  behavior: string;

  @IsNotEmpty()
  @IsBoolean()
  include_in_dimob: boolean;

  @IsNotEmpty()
  @IsBoolean()
  charge_management_fee: boolean;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsString()
  item_type?: string;
}
