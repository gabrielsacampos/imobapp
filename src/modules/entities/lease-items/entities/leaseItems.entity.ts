export class LeaseItems {
  id?: number;

  id_lease_imobzi?: string;

  due_date: Date;

  description: string;

  management_fee: boolean;

  recurrent: boolean;

  value: number;

  until_due_date: boolean;

  behavior: string;

  repeat_index: number;

  include_in_dimob: boolean;

  start_date?: Date;

  repeat_total?: number;
}
