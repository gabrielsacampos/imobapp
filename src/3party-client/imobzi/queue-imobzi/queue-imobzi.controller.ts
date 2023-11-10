import { Body, Controller, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { StoreDb } from './interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi.service';

@Controller('imobzi-queues')
export class QueueImobziController {
  private logger = new Logger('QueueImobziController');
  constructor(private readonly queueImobziService: QueueImobziService) {}

  @Post('dump')
  async stroreDb(@Body() data: StoreDb) {
    try {
      this.logger.verbose(`imobzi-queue running and updating entities: ${JSON.stringify(data, null, 1)}`);
      this.queueImobziService.storeDb(data);
      return { message: 'running imobziQueue' };
    } catch (error) {
      this.logger.error(`Failed on storeDb(): ${error.message}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
