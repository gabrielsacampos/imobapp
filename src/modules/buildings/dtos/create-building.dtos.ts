import { IsNotEmpty } from 'class-validator';
import { Building } from '../entities/building.entity';

export class CreateBuildingDTO extends Building {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty({ message: 'emptiiii' })
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipcode: string;

  block?: string;
}
