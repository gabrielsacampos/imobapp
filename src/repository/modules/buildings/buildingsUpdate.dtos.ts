import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuildingsUpdateDTO {
  @ApiProperty({
    description: "the building's name",
    example: 'The BigTower',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Buildin`s address',
    example: 'Great Street, 480',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Building`s city',
    example: 'ZoombieLand',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Building`s zipcode',
    example: '111111-000',
  })
  @IsNotEmpty()
  zipcode: string;

  block?: string;
}
