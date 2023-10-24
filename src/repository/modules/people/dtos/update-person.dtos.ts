import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDTO } from './create-person.dtos';

export class UpdatePersonDTO extends PartialType(CreatePersonDTO) {}
