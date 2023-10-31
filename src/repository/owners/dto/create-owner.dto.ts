import { NotAcceptableException } from '@nestjs/common';
import { ValidateIf } from 'class-validator';
import { Owner } from '../entities/owner.entity';

export class CreateOwnerDto extends Owner {
  @ValidateIf((o) => {
    if (!o.id_owner_person_imobzi && !o.id_owner_organization_imobzi) {
      throw new NotAcceptableException(
        'one of `id_owner_person_imobzi` or `id_owner_organization_imobzi` must has value',
      );
    } else if (o.id_owner_person_imobzi && o.id_owner_organization_imobzi) {
      throw new NotAcceptableException(
        'only one of `id_owner_person_imobzi` or `id_owner_organization_imobzi` must has value',
      );
    }
    return true;
  })
  @ValidateIf((o) => {
    if (o.share > 100) {
      throw new NotAcceptableException(`Share must be lass than 100 percent`);
    } else if (o.share <= 0) {
      throw new NotAcceptableException(`Share must be bigger than 0 percent`);
    }
    return true;
  })
  id_owner_person_imobzi: string | null;
  id_owner_organization_imobzi: string | null;
  share: number;
}
