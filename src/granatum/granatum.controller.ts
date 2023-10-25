import { Body, Controller, Post } from '@nestjs/common';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GranatumService } from './granatum.service';

@Controller('granatum')
export class GranatumController {
  constructor(
    private readonly granatumService: GranatumService,
    private readonly granatumQueueProducer: GranatumQueueProducer,
  ) {}

  @Post('sync')
  async postInvoices(@Body() data: { start_at: string; end_at: string }) {
    this.granatumQueueProducer.updateGranatum(data.start_at, data.end_at);
    return { message: 'GranatumService starting queue...' };
  }
}
