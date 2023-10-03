import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NotAcceptableException } from '@nestjs/common';
import { OwnersCreateDTO } from './owners/OwnerCreate.dtos';

export class PropertiesUpdateDTO {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  id_building_imobzi: string;

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
    const sumShare = o.owners.reduce((acc: number, curr: OwnersCreateDTO) => {
      acc += curr.share;
      return acc;
    }, 0);
    if (sumShare !== 100) {
      throw new NotAcceptableException(`Sum of shares must be equal to 100`);
    }
    return true;
  })
  @ValidateIf((o) => {
    if (!o.owners) {
      throw new NotAcceptableException(`Missing owners array`);
    } else if (o.owners.length === 0) {
      throw new NotAcceptableException(`Property must have at least one owner`);
    }
    return true;
  })
  @ValidateNested()
  @Type(() => OwnersCreateDTO)
  owners: OwnersCreateDTO[];
}
