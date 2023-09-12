import { IsNotEmpty } from 'class-validator';

export class LeaseItemsUpdateDTO {
  @IsNotEmpty()
  due_date: string;

  @IsNotEmpty()
  decription: string;

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
  autopay_on_due_date: boolean;

  @IsNotEmpty()
  repeat_index: number;

  @IsNotEmpty()
  include_in_dimob: boolean;

  @IsNotEmpty()
  start_date: string;

  repeat_total?: number;
}
