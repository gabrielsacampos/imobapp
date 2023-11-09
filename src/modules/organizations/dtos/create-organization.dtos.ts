import { IsEmail, IsNotEmpty } from 'class-validator';
import { Organization } from '../entities/organization.entity';

export class CreateOrganizationDTO extends Organization {
  @IsNotEmpty()
  id_imobzi: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id_person_representative: string;

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
