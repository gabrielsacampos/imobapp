import { Body, Controller, Post } from '@nestjs/common';
import { FetchDb } from './queue-granatum/interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';
import { StoreDb } from './queue-imobzi/interfaces/imobziQueue.interface';
import { QueuesService } from './queues.service';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly imobziQueueService: QueueImobziService,
    private readonly queueGranatumService: QueueGranatumService,
  ) {}

  @Post('/imobzi/update-db')
  async syncImobziDb(@Body() data: StoreDb) {
    this.queuesService.imobziStoreDb(data);
    return { message: 'ImobziQueue updating database' };
  }

  @Post('/granatum/sync')
  async syncGranatumDb(@Body() data: FetchDb) {
    this.queuesService.granatumSyncDb(data);
    return { message: 'GranatumQueue fetching database' };
  }
}
