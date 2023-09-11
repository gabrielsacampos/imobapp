import { NotAcceptableException } from '@nestjs/common';
import { ValidateIf } from 'class-validator';

export class OwnersCreateDTO {
  id: number;

  @ValidateIf((o) => {
    if (!o.id_owner_person && !o.id_owner_organization) {
      throw new NotAcceptableException(
        'one of `id_owner_person` or `id_owner_organization` must has value',
      );
    } else if (o.id_owner_person && o.id_owner_organization) {
      throw new NotAcceptableException(
        'only one of `id_owner_person` or `id_owner_organization` must has value',
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
  id_owner_person: bigint;
  id_owner_organization: bigint;

  id_property: bigint;
  share: number;
}
