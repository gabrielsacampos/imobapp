import { Body, Controller, Post } from '@nestjs/common';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';
import { FetchDb } from './queue-granatum/interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';
import { StoreDb } from './queue-imobzi/interfaces/imobziQueue.interface';
import { QueuesService } from './queues.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly imobziQueueService: QueueImobziService,
    private readonly QueueGranatumService: QueueGranatumService,
  ) {}

  @Post('/imobzi/update-db')
  async syncImobziDb(@Body() data: StoreDb) {
    this.imobziQueueService.storeDb(data);
    return { message: 'ImobziQueue updating database' };
  }

  @Post('/granatum/sync')
  async syncGranatumDb(@Body() data: FetchDb) {
    this.QueueGranatumService.fetchDb(data);
    return { message: 'GranatumQueue fetching database' };
  }
}
