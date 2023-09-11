import { ValidateIf } from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

export class TenantsUpdateDTO {
  @ValidateIf((o) => {
    if (!o.id_tenant_organization && !o.id_tenant_person) {
      throw new NotAcceptableException(
        'one of `id_tenant_person` or `id_tenant_organization` must has value',
      );
    }
    return true;
  })
  id_tenant_organization?: bigint;
  id_tenant_person?: bigint;
}
