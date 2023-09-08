import { IsEmail, IsNotEmpty } from 'class-validator';

export class OrganizationsCreateDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  person_id_representative: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  representative_type: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  address?: string;
}
