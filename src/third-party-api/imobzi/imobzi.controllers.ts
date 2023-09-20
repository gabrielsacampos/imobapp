import { Controller, Get } from '@nestjs/common';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(private readonly imobziService: ImobziService) {}

  @Get('contacts-to-update')
  async getContactsToUpdate() {
    return await this.imobziService.getContactsToUpdate();
  }

  @Get('properties-to-update')
  async getPropertiesToUpdate() {
    return await this.imobziService.getPropertiesIdsToUpdate();
  }
}
