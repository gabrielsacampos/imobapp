import { Body, Controller, Post } from '@nestjs/common';
import { FetchDb } from './queue-granatum/interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';
import { StoreDb } from './queue-imobzi/interfaces/imobziQueue.interface';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queueImobziService: QueueImobziService,
    private readonly queueGranatumService: QueueGranatumService,
  ) {}

  @Post('imobzi/update-db')
  async syncImobziDb(@Body() data: StoreDb) {
    this.queueImobziService.storeDb(data);
    return { message: 'queueImobzi updating database' };
  }

  @Post('granatum/sync')
  async syncGranatumDb(@Body() data: FetchDb) {
    this.queueGranatumService.fetchDb(data);
    return { message: 'GranatumQueue fetching database' };
  }
}
