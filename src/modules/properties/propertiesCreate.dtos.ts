import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { OwnersCreateDTO } from '../owners/ownersCreate.dtos';

export class PropertiesCreateDTO {
  @IsNotEmpty()
  id: bigint;

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

  @ValidateNested()
  @Type(() => OwnersCreateDTO)
  owners!: OwnersCreateDTO;
}
