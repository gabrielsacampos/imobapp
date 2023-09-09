import { IsNotEmpty } from 'class-validator';

export class BuildingsUpdateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipcode: string;
}
