import { Body, Controller, Post } from '@nestjs/common';
import { GranatumQueueService } from './granatumQueue/granatumQueue.service';
import { QueuesService } from './queues.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly imobziQueueService: ImobziQueueService,
    private readonly granatumQueueService: GranatumQueueService,
  ) {}

  @Post('imobzi/update-db')
  async syncImobziDb(@Body() data: any) {
    this.imobziQueueService.storeDb(data);
    return { message: 'ImobziQueue updating database' };
  }

  @Post('granatum/sync')
  async syncGranatumDb(@Body() data: { start_at: string; end_at: string }) {
    this.granatumQueueService.fetchDb(data.start_at, data.end_at);
    return { message: 'GranatumQueue fetching database' };
  }
}
