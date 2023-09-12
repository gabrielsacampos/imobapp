import { NotAcceptableException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { BeneficiariesCreateDTO } from './beneficiaries/beneficiariesCreate.dtos';

export class LeasesCreateDTO {
  @IsNotEmpty()
  id: bigint;

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
  main_guarantor?: bigint;

  @ValidateIf((o) => {
    if (!o.id_tenant_person && !o.id_tenant_organization) {
      throw new NotAcceptableException(
        `lease must have only one type of tenant (organization or person)`,
      );
    } else if (o.id_tenant_person && o.id_tenant_organization) {
      throw new NotAcceptableException(
        `lease must have only one type of tenant (organization or person)`,
      );
    }

    return true;
  })
  id_tenant_person?: bigint;
  id_tenant_organization?: bigint;

  @ValidateNested({
    message: 'You need to set at least one beneficiary to lease',
  })
  @Type(() => BeneficiariesCreateDTO)
  beneficiaries!: BeneficiariesCreateDTO;

  @ValidateIf((o) => {
    const shareSum = o.beneficiaries.reduce(
      (acc: number, curr: BeneficiariesCreateDTO) => {
        acc += curr.share;
        return acc;
      },
      0,
    );
    if (shareSum !== 100) {
      throw new NotAcceptableException(
        'Sum of benficiaries share must be equal to 100',
      );
    }
    return true;
  })
  share: number;
}
