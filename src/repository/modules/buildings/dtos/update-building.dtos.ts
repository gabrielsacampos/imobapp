import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDTO } from './create-building.dtos';

export class UpdateBuildingDTO extends PartialType(CreateBuildingDTO) {}
