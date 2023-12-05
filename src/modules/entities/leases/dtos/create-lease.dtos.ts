import { NotAcceptableException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { Lease } from '../entities/lease.entity';
import { CreateLeaseItemsDTO } from '../../lease-items/dtos/create-leaseItems.dtos';
import { CreateBeneficiaryDTO } from './create-beneficiary.dtos';

export class CreateLeaseDTO extends Lease {
  @IsNotEmpty()
  readjustment_month: number;

  @IsNotEmpty()
  id_imobzi: string;

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
  id_property_imobzi: string;

  @IsNotEmpty()
  start_at: Date;

  @IsNotEmpty()
  end_at: Date;

  @IsNotEmpty()
  status: string;

  id_annual_readjustment_imobzi: string;
  code_imobzi: string;
  guarantee_value: number;

  @ValidateIf((o) => {
    if (!o.id_tenant_person_imobzi && !o.id_tenant_organization_imobzi) {
      throw new NotAcceptableException(`lease must have only one type of tenant (organization or person)`);
    } else if (o.id_tenant_person_imobzi && o.id_tenant_organization_imobzi) {
      throw new NotAcceptableException(`lease must have only one type of tenant (organization or person)`);
    }

    return true;
  })
  id_tenant_person_imobzi?: string;
  id_tenant_organization_imobzi?: string;

  @ValidateNested({
    message: 'You need to set at least one beneficiary to lease',
  })
  @Type(() => CreateBeneficiaryDTO)
  beneficiariesLease!: CreateBeneficiaryDTO[];

  @ValidateNested({
    message: 'You need to set at least one beneficiary to lease',
  })
  @Type(() => CreateLeaseItemsDTO)
  @ValidateNested({ each: true })
  @ArrayNotEmpty({ message: 'Array of leaseItems can not be empty' })
  leaseItems!: CreateLeaseItemsDTO[];

  id_main_guarantor_imobzi?: string;
  updated_at?: Date;
}
