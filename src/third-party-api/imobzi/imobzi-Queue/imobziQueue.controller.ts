import { Controller, Get } from '@nestjs/common';
import { ImobziQueueService } from './imobziQueue.service';

@Controller('queues')
export class ImobziQueueController {
  constructor(private readonly imobziQueueService: ImobziQueueService) {}

  @Get('run')
  runQueue() {
    this.imobziQueueService.runQueue();
    return 'running queue';
  }
}
