import { Body, Controller, Post } from '@nestjs/common';
import { FetchDb } from './interfaces/imobziQueue.interface';
import { QueueGranatumService } from './queue-granatum.service';

@Controller('granatum-queue')
export class QueueGranatumController {
  constructor(private readonly queueGranatumService: QueueGranatumService) {}

  @Post('sync')
  async fetchDb(@Body() data: FetchDb) {
    this.queueGranatumService.fetchDb(data);
    return { message: 'granatumQueue is running' };
  }
}
