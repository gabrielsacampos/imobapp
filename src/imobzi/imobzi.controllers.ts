import { Controller, Get } from '@nestjs/common';
import { ImobziQueueProducer } from './imobzi.queue.producer';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly imobziQueueProducer: ImobziQueueProducer,
  ) {}

  @Get('dumpdb')
  async dumpDatabase() {
    this.imobziQueueProducer.dumpEntitiesData();
    return { message: 'application started queues and update' };
  }
}
