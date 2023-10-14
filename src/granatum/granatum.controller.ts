import { Body, Controller, Post } from '@nestjs/common';
import { GranatumQueueProducer } from './granatum.queue.producer';

@Controller('granatum')
export class GranatumController {
  constructor(private readonly granatumQueueProducer: GranatumQueueProducer) {}

  @Post('sync')
  async syncGranatumImobzi(@Body() data: { start_at: string; end_at: string }) {
    this.granatumQueueProducer.syncImobziGranatumTransactions(data.start_at, data.end_at);
    return { message: 'GranatumService starting queue...' };
  }
}
