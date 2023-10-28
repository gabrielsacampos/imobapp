import { Controller } from '@nestjs/common';
import { QueueGranatumService } from './queue-granatum.service';

@Controller('granatum-queue')
export class QueueGranatumController {
  constructor(private readonly QueueGranatumService: QueueGranatumService) {}
}
