import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InvoiceDTO {
  @ApiProperty({
    description: 'invoice id',
    example: '12huh8377dbgs81734cgd',
  })
  @IsNotEmpty()
  id: string;

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
  due_date: string;

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
  @IsNotEmpty()
  interest_value: number;

  @ApiProperty({
    description: 'lease id reference',
    example: 81728374782,
  })
  @IsNotEmpty()
  id_lease_imobzi: string;

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

  
  paid_at?: string;
  credit_at?: string;
  paid_manual?: boolean;
  bank_fee_value?: number;
  account_credit?: string;
  onlending_value?: number;
  reference?: string;
}
