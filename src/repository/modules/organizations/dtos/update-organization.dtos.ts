import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDTO } from './create-organization.dtos';

export class UpdateOrganizationDTO extends PartialType(CreateOrganizationDTO) {}
