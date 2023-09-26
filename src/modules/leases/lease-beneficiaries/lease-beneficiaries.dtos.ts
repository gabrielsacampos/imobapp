import { NotAcceptableException } from '@nestjs/common';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class BeneficiariesCreateDTO {
  @ValidateIf((o) => {
    if (!o.id_beneficiary_person && !o.id_beneficiary_organization) {
      throw new NotAcceptableException(
        'at least one of id_beneficiary_organization or id_beneficiary_person must have value',
      );
    }
    return true;
  })
  id_beneficiary_organization?: bigint;
  id_beneficiary_person?: bigint;
  id_lease: bigint;

  @IsNotEmpty()
  share: number;
}
