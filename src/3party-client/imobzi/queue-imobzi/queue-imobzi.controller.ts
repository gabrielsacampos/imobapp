import { Body, Controller, Post } from '@nestjs/common';
import { StoreDb } from './interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi.service';

@Controller('imobzi-queues')
export class QueueImobziController {
  constructor(private readonly queueImobziService: QueueImobziService) {}

  @Post('dump')
  async(@Body() data: StoreDb) {
    this.queueImobziService.storeDb(data);
    return { message: 'running imobziQueue' };
  }
}
