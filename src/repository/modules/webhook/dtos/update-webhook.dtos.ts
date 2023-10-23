import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from '../../users/dtos/create-user.dtos';

export class UpdateWebHookDTO extends PartialType(CreateUserDTO) {}
