import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { BeneficiariesCreateDTO } from './lease-beneficiaries/lease-beneficiaries.dtos';
import { LeaseItemsCreateDTO } from './lease-items/leaseItemsCreate.dtos';

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

  id_annual_readjustment_imobzi: string;
  code_imobzi: string;
  guarantee_value: number;
  main_guarantor: bigint;
  master_tenant_person: bigint;
  tenant_organization: bigint;

  @ValidateNested({
    message: 'You need to set at least one beneficiary to lease',
  })
  @Type(() => BeneficiariesCreateDTO)
  beneficiaries!: BeneficiariesCreateDTO;

  @Type(() => LeaseItemsCreateDTO)
  lease_items!: LeaseItemsCreateDTO[];
}
