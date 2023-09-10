import { IsNotEmpty, ValidateIf } from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

export class OwnersUpdateDTO {
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
  id_owner_orgnization: bigint;
  id_owner_person: bigint;

  @IsNotEmpty()
  share: number;
}
