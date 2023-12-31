import { NotAcceptableException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { CreateOwnerDto } from 'src/modules/entities/owners/dto/create-owner.dto';
import { Property } from '../entities/property.entity';

export class CreatePropertyDTO extends Property {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  id_building_imobzi: string;

  @IsNotEmpty()
  unity: string;

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
  block?: string;

  @ValidateIf((o) => {
    const sumShare = o.owners.reduce((acc: number, curr: CreateOwnerDto) => {
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
  @Type(() => CreateOwnerDto)
  owners: CreateOwnerDto[];
}
