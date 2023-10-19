import { IsNotEmpty } from 'class-validator';

export class ItemsInvoiceCreateDTO {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  until_due_date: boolean;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  behavior: string;

  @IsNotEmpty()
  include_in_dimob: boolean;

  @IsNotEmpty()
  charge_management_fee: boolean;

  @IsNotEmpty()
  value: number;

  item_type?: string;
}
