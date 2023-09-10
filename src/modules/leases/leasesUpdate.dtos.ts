import { IsNotEmpty } from 'class-validator';

export class LeasesUpdateDTO {
  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  fee: number;

  @IsNotEmpty()
  guarantee_type: string;

  @IsNotEmpty()
  include_in_dimob: boolean;

  @IsNotEmpty()
  indeterminate: boolean;

  @IsNotEmpty()
  irrf: boolean;

  @IsNotEmpty()
  lease_value: number;

  @IsNotEmpty()
  property_id: bigint;

  @IsNotEmpty()
  start_at: string;

  @IsNotEmpty()
  status: string;

  annual_readjustment: string;
  code_imobzi: string;
  guarantee_value: number;
  main_guarantor: bigint;
  master_tenant_person: bigint;
  tenant_organization: bigint;
}