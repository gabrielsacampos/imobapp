import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
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
    if (new Date(data.start_at) > new Date(data.end_at)) {
      throw new NotAcceptableException(`end date must be bigger than start date`);
    }
    this.granatumQueueProducer.updateGranatum(data.start_at, data.end_at);
    return { message: 'GranatumService starting queue...' };
  }
}
