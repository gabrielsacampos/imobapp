import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWebhookDTO } from './dtos/create-webhook.dtos';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('imobzi')
  async storeImobziWebhook(@Body() data: CreateWebhookDTO) {
    return await this.webhookService.storeImobziWebhook(data);
  }

  @Get('undone')
  async getUndone() {
    return await this.webhookService.getUndone();
  }

  @Get('done')
  async getDone() {
    return await this.webhookService.getDone();
  }
}
