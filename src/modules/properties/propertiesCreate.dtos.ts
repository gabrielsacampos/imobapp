import { IsNotEmpty } from 'class-validator';

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
}
