import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateInvoiceItemDto } from 'src/modules/invoice_items/dto/create-invoice_item.dto';
import { Invoice } from '../entities/invoice.entity';

export class CreateInvoiceDTO implements Invoice {
  id?: number;
  interest_value?: number;

  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  id_lease_imobzi: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  due_date: Date;

  @IsNotEmpty()
  management_fee: number;

  @IsNotEmpty()
  invoice_url: string;

  @IsNotEmpty()
  total_value: number;

  barcode?: string;

  bank_slip_url?: string;

  bank_slip_id?: string;

  @ValidateNested({
    message: 'You need to set at least one item to invoice',
  })
  @Type(() => CreateInvoiceItemDto)
  invoiceItems?: CreateInvoiceItemDto[];

  paid_at?: Date;
  credit_at?: Date;
  paid_manual?: boolean;
  bank_fee_value?: number;
  account_credit?: string;
  onlending_value?: number;
  reference_start_at?: string;
  reference_end_at?: string;
}
