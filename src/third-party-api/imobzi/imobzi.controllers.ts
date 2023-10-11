import { Body, Controller, Get, Post } from '@nestjs/common';
import { ImobziWebhookDTO } from './imobzi-dtos/imobziWebhook.dtos';
import { ImobziQueueProducer } from './imobzi.queue.producer';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly imobziQueue: ImobziQueueProducer,
  ) {}

  @Post('webhooks')
  async updateDatabase(@Body() data: ImobziWebhookDTO) {
    return this.imobziQueue.handleWebhook(data);
  }

  @Get('dumpdb')
  async dumpDatabase() {
    this.imobziQueue.dumpEntitiesData();
    return { message: 'application started queues and update' };
  }
}
