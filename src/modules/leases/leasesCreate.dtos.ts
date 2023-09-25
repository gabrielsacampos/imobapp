import { NotAcceptableException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { BeneficiariesCreateDTO } from './beneficiaries/beneficiariesCreate.dtos';

export class LeasesCreateDTO {
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
  start_at: string;

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
  @Type(() => BeneficiariesCreateDTO)
  beneficiaries!: BeneficiariesCreateDTO;

  @ValidateIf((o) => {
    const shareSum = o.beneficiaries.reduce((acc: number, curr: BeneficiariesCreateDTO) => {
      acc += curr.share;
      return acc;
    }, 0);
    if (shareSum !== 100) {
      throw new NotAcceptableException('Sum of benficiaries share must be equal to 100');
    }
    return true;
  })
  share: number;

  id_main_guarantor_imobzi?: string;
  updated_at?: Date;
}
