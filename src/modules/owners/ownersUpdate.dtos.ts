import { IsNotEmpty, ValidateIf } from 'class-validator';

export class OwnersUpdateDTO {
  @ValidateIf((object, value) => value === null || value === undefined)
  @IsNotEmpty({
    message:
      'at least `id_owner_person` or `id_owner_organization` should have value',
  })
  @ValidateIf((object, value) => value === null || value === undefined)
  @IsNotEmpty({
    message:
      'at least `id_owner_person` or `id_owner_organization` should have value',
  })
  id_owner_orgnization: bigint;
  id_owner_person: bigint;

  @IsNotEmpty()
  share: number;
}
