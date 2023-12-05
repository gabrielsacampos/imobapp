import { IsBoolean, IsNotEmpty } from 'class-validator';
import { LeaseItems } from '../entities/leaseItems.entity';

export class CreateLeaseItemsDTO extends LeaseItems {
  id_lease_imobzi?: string;

  @IsNotEmpty()
  due_date: Date;

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

  start_date?: Date;

  repeat_total?: number;
}
