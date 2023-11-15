import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export enum StoreDbType {
  backup = 'backup',
  update = 'update',
}

export class StoreDb {
  @IsNotEmpty()
  @IsEnum(StoreDbType)
  type: StoreDbType;

  @IsNotEmpty()
  @IsBoolean()
  contacts: boolean | true;

  @IsNotEmpty()
  @IsBoolean()
  buildings: boolean | true;

  @IsNotEmpty()
  @IsBoolean()
  properties: boolean | true;

  @IsNotEmpty()
  @IsBoolean()
  leases: boolean | true;

  @IsNotEmpty()
  invoices: { start_due_date: string };
}
