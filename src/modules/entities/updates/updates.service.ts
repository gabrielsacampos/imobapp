import { Injectable } from '@nestjs/common';

import { CreateUpdateDto } from './dto/create-update.dto';
import { Update } from './entities/update.entity';

import { UpdatesRepository } from './updates.repository';

@Injectable()
export class UpdatesService {
  constructor(private readonly updatesRepository: UpdatesRepository) {}

  async create(data: CreateUpdateDto) {
    return this.updatesRepository.create(data);
  }

  async entitylastUpdate(entities?: string | undefined): Promise<Update> {
    return await this.updatesRepository.getLastUpdateByEntity(entities);
  }
}
