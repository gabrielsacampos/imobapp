import { Controller, Get } from '@nestjs/common';
import { ImobziService } from './imobzi.service';
import { ImobziQueueProducer } from './imobziQueue.producer';

@Controller('imobzi')
export class ImobziController {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly imobziQueueProducer: ImobziQueueProducer,
  ) {}

  @Get('update')
  async updateEntities() {
    this.imobziQueueProducer.verifyEntitiesToUpdate();
    return 'starting updates';
  }
}
