import { Controller, Get } from '@nestjs/common';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziService } from './imobzi.service';
import { ImobziQueueProducer } from './imobziQueue.producer';

@Controller('imobzi')
export class ImobziController {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziQueueProducer: ImobziQueueProducer,
  ) {}

  @Get('')
  async printInfo() {
    return { message: 'You are at imobzi area' };
  }

  @Get('update')
  async updateEntities() {
    this.imobziQueueProducer.verifyEntitiesToUpdate();
    return 'starting updates';
  }
}
