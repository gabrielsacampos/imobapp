import { IsBoolean, IsNotEmpty } from 'class-validator';

export class LeaseItemsCreateDTO {
  @IsNotEmpty()
  due_date: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  management_fee: boolean;

  @IsNotEmpty()
  recurrent: boolean;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  until_due_date: boolean;

  @IsNotEmpty()
  behavior: string;

  @IsNotEmpty()
  @IsBoolean()
  repeat_index: number;

  @IsNotEmpty()
  include_in_dimob: boolean;

  start_date?: string;

  repeat_total?: number;
}
