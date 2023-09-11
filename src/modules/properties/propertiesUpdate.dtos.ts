import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OwnersUpdateDTO } from '../owners/ownersUpdate.dtos';
import { NotAcceptableException } from '@nestjs/common';

export class PropertiesUpdateDTO {
  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  building_id: bigint;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  type: string;

  bedroom?: number;
  suite?: number;
  garage?: number;
  area?: number;
  rental_value?: number;
  sale_value?: number;
  alternative_code?: string;

  @ValidateIf((o) => {
    const sumShare = o.owners.reduce((acc: number, curr: OwnersUpdateDTO) => {
      acc += curr.share;
      return acc;
    }, 0);
    if (sumShare !== 100) {
      throw new NotAcceptableException(`Sum of shares must be equal to 100`);
    }
    return true;
  })
  @ValidateNested()
  @Type(() => OwnersUpdateDTO)
  owners!: OwnersUpdateDTO;
}
