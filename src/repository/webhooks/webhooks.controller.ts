import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWebhookDTO } from './dtos/create-webhook.dtos';
import { WebhooksService } from './webhooks.service';

@Controller('webhook')
export class WebhooksController {
  constructor(private readonly webhookService: WebhooksService) {}

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
