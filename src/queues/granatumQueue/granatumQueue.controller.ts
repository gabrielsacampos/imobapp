import { Controller } from '@nestjs/common';
import { GranatumQueueService } from './granatumQueue.service';

@Controller('granatum-queue')
export class GranatumQueueController {
  constructor(private readonly granatumQueueService: GranatumQueueService) {}
}
