import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaseDTO } from './create-lease.dtos';

export class UpdateLeaseDTO extends PartialType(CreateLeaseDTO) {}
