import { Body, Controller, Post } from '@nestjs/common';
import { ImobziWebhookDTO } from './imobzi-dtos/imobziWebhook.dtos';
import { ImobziService } from './imobzi.service';

@Controller('imobzi')
export class ImobziController {
  constructor(private readonly imobziService: ImobziService) {}

  @Post('webhooks')
  async updateDatabase(@Body() data: ImobziWebhookDTO) {
    return this.imobziService.handleWebhook(data);
  }
}
