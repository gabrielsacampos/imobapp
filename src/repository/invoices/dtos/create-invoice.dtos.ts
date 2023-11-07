import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateInvoiceItemDto } from 'src/repository/invoice_items/dto/create-invoice_item.dto';
import { Invoice } from '../entities/invoice.entity';

export class CreateInvoiceDTO implements Invoice {
  id?: number;
  interest_value?: number;

  @ApiProperty({
    description: 'invoice id from imobzi',
    example: '12huh8377dbgs81734cgd',
  })
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  id_lease_imobzi: string;

  @ApiProperty({
    description: 'invoice status',
    example: 'paid',
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'invoice due date',
    example: '2023-05-10',
  })
  @IsNotEmpty()
  due_date: Date;

  @ApiProperty({
    description: 'total of management fee',
    example: 150,
  })
  @IsNotEmpty()
  management_fee: number;

  @ApiProperty({
    description: 'url to invoice details',
    example: 'www.invoices.co/12huh8377dbgs81734cgd',
  })
  @IsNotEmpty()
  invoice_url: string;

  @ApiProperty({
    description: 'total value of invoice',
    example: 1000,
  })
  @IsNotEmpty()
  total_value: number;

  @ApiProperty({
    description: 'charge and fee for late payment',
    example: 10,
  })
  @ApiProperty({
    description: 'lease id from imobzi reference',
    example: 81728374782,
  })
  @ApiProperty({
    description: 'barcode to bank slip payment',
    example: '500040 30990420 094920340 3939292',
  })
  barcode?: string;

  @ApiProperty({
    description: 'url to bank slip',
    example: 'www.bank.co/slip/1234567',
  })
  bank_slip_url?: string;

  @ApiProperty({
    description: 'bank slip id ',
    example: 1234567,
  })
  bank_slip_id?: string;

  @ApiProperty({
    description: 'array of items from invoice',
    example: [
      {
        until_due_date: false,
        item_type: 'lease_value',
        contact: null,
        invoice_item_id: '6547366854ab11ed8c9a13cb5bf0c9b6',
        description: 'Aluguel ref. 2023-01-01 a 2023-01-31',
        behavior: 'charge_tenant_and_onlend',
        landlords: [],
        include_in_dimob: true,
        charge_management_fee: true,
        value: 1000.0,
      },
      {
        until_due_date: false,
        item_type: 'lease_value',
        contact: null,
        invoice_item_id: '6547366854ab11ed8c9a13cb5bf0c9b6',
        description: 'Aluguel ref. 2023-01-01 a 2023-01-31',
        behavior: 'charge_tenant_and_onlend',
        landlords: [],
        include_in_dimob: true,
        charge_management_fee: true,
        value: 1000.0,
      },
    ],
  })
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
