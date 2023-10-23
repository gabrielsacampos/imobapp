import { CreateUserDTO } from './create-user.dtos';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
