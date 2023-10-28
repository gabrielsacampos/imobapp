import { Controller } from '@nestjs/common';
import { QueueImobziService } from './queue-imobzi.service';

@Controller('imobzi-queues')
export class QueueImobziController {
  constructor(private readonly QueueImobziService: QueueImobziService) {}
}
