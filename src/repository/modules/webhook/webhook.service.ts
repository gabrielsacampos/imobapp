import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateWebhookDTO } from './dtos/create-webhook.dtos';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  async storeImobziWebhook(data: CreateWebhookDTO) {
    await this.prisma.webhook.create({ data });
  }

  async getUndone() {
    return await this.prisma.webhook.findMany({ where: { done: true } });
  }

  async getDone() {
    return await this.prisma.webhook.findMany({ where: { done: true } });
  }
}
