import { IsNotEmpty } from 'class-validator';

export class BuildingsCreateDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipcode: string;
}
