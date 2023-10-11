import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BuildingsCreateDTO {
  @ApiProperty({
    description: 'the id from building (BigInt)',
    example: 34122412324324,
  })
  @IsNotEmpty()
  id_imobzi: string;

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
  @IsNotEmpty({ message: 'emptiiii' })
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
}
