import { Controller, Get } from '@nestjs/common';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(private readonly imobziService: ImobziService) {}

  @Get()
  async get() {
    return this.imobziService.getContactsToUpdate();
  }
}
