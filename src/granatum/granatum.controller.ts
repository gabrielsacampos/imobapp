import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { QueuesService } from 'src/queues/queues.service';

@Controller('granatum')
export class GranatumController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post('sync')
  async postInvoices(@Body() data: { start_at: string; end_at: string }) {
    if (new Date(data.start_at) > new Date(data.end_at)) {
      throw new NotAcceptableException(`end date must be bigger than start date`);
    }
    return { message: 'GranatumService starting queue...' };
  }
}
