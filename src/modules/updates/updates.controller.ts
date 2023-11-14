import { Body, Controller, Post } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdatesRepository } from './updates.repository';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesRepository: UpdatesRepository) {}

  @Post()
  create(@Body() createUpdateDto: CreateUpdateDto) {
    return this.updatesRepository.create(createUpdateDto);
  }
}
