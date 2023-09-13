import { IsNotEmpty } from 'class-validator';

export class invoiceItemsCreateDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  invoice_id: string;

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
}
