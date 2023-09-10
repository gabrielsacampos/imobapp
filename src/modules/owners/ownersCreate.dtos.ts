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
  id_owner_person: bigint;
  id_owner_organization: bigint;

  id_property: bigint;
  share: number;
}
