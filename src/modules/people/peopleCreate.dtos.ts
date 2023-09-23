import { IsEmail, IsNotEmpty } from 'class-validator';

export class PeopleCreateDTO {
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

  birthdate?: Date;
  alternative_address?: string;
  alternative_address_reference?: string;
  gender?: string;
  marital_status?: string;
  code_imobzi?: string;
  profession?: string;
  children?: number;
  pets?: number;
  kind_of_pet?: string;
  anual_revenue?: number;
}
