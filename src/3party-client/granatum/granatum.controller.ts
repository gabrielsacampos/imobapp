import { Body, Controller, Post } from '@nestjs/common';
import { FetchDb } from './interfaces/granatum.queue.interface';
import { QueueGranatumProducer } from './queue-granatum.producer';

@Controller('granatum')
export class GranatumController {
  constructor(private readonly queueGranatumProducer: QueueGranatumProducer) {}

  @Post('sync')
  async syncDb(@Body() data: FetchDb) {
    this.queueGranatumProducer.syncDb(data);
    return { message: 'running GranatumQueue' };
  }
}
