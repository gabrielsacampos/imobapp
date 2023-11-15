import { Body, Controller, Logger, Post } from '@nestjs/common';
import { StoreDb } from './interfaces/imobziQueue.interface';
import { QueueImobziProducer } from './queue-imobzi.producer';

@Controller('imobzi')
export class ImobziController {
  private logger = new Logger('QueueImobziController');
  constructor(private readonly queueImobziProducer: QueueImobziProducer) {}

  @Post('backup')
  async backupImobzi(@Body() data: StoreDb) {
    this.queueImobziProducer.produce(data);
    return { message: 'running imobziQueue' };
  }
}
