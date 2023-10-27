import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ImobziQueueProducer } from './imobzi.queue.producer';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly imobziQueueProducer: ImobziQueueProducer,
  ) {}

  @Get('dumpdb')
  // @Cron('0 * * * *')
  async dumpDatabase() {
    this.imobziQueueProducer.dumpEntitiesData();
    console.log(`cron iniciado as ${new Date()}`);
    return { message: 'application started queues and update' };
  }
}
