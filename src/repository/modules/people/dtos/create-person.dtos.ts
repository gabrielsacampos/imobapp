import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Person } from '../entities/person.entity';

export class CreatePersonDTO extends Person {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsDate()
  birthdate?: Date;

  @IsString()
  alternative_address?: string;

  @IsString()
  alternative_address_reference?: string;

  @IsString()
  gender?: string;

  @IsString()
  marital_status?: string;

  @IsString()
  code_imobzi?: string;

  @IsString()
  profession?: string;

  @IsNumber()
  children?: number;

  @IsNumber()
  pets?: number;

  @IsString()
  kind_of_pet?: string;

  @IsNumber()
  anual_revenue?: number;
}
