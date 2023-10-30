import { Injectable, NotFoundException } from '@nestjs/common';
import { Webhook } from '@prisma/client';
import { ImobziContactsService } from 'src/imobzi/imobzi-contacts/imobziContacts.service';
import { ImobziInvoicesService } from 'src/imobzi/imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from 'src/imobzi/imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from 'src/imobzi/imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from 'src/imobzi/imobzi-people/imobziPeople.service';
import { ImobziPropertiesService } from 'src/imobzi/imobzi-properties/imobziProperties.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateWebhookDTO } from './dtos/create-webhook.dtos';
import { UpdateWebhookDTO } from './dtos/update-webhook.dtos';

@Injectable()
export class WebhooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
  ) {}

  async storeImobziWebhook(data: CreateWebhookDTO) {
    try {
      return await this.prisma.webhook.create({ data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUndone(): Promise<Webhook[]> {
    try {
      return await this.prisma.webhook.findMany({ where: { done: true } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDone(): Promise<Webhook[]> {
    try {
      return await this.prisma.webhook.findMany({ where: { done: true } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, data: UpdateWebhookDTO): Promise<Webhook> {
    try {
      const existsWebhook = await this.prisma.webhook.findFirst({ where: { id } });
      if (!existsWebhook) {
        throw new NotFoundException(
          `webhook id: ${id} with data: ${JSON.stringify(UpdateWebhookDTO, null, 2)} does not exists`,
        );
      }
      return await this.prisma.webhook.update({ where: { id }, data });
    } catch (error) {
      throw new Error(error);
    }
  }
}
