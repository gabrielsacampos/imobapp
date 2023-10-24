import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDTO } from './create-property.dtos';

export class UpdatePropertyDTO extends PartialType(CreatePropertyDTO) {}
