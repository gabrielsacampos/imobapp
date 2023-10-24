import { Injectable } from '@nestjs/common';
import { Webhook } from '@prisma/client';
import { ImobziContactsService } from 'src/imobzi/imobzi-contacts/imobziContacts.service';
import { ImobziInvoicesService } from 'src/imobzi/imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from 'src/imobzi/imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from 'src/imobzi/imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from 'src/imobzi/imobzi-people/imobziPeople.service';
import { ImobziPropertiesService } from 'src/imobzi/imobzi-properties/imobziProperties.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateWebhookDTO } from './dtos/create-webhook.dtos';

@Injectable()
export class WebhookService {
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
    await this.prisma.webhook.create({ data });
  }

  async getUndone(): Promise<Webhook[]> {
    return await this.prisma.webhook.findMany({ where: { done: true } });
  }

  async getDone(): Promise<Webhook[]> {
    return await this.prisma.webhook.findMany({ where: { done: true } });
  }

  async handleWebhooks() {
    const webhooks = await this.getDone();
    const contacts = webhooks.filter((webhook) => {
      webhook.event === 'contact_created' || webhook.event === 'contact_updated';
    });

    if (contacts.length > 1) {
      this.handleWebhooksContacts(contacts);
    }

    const properties = webhooks.filter((webhook) => {
      webhook.event === 'property_created' || webhook.event === 'property_updated';
    });

    if (properties.length > 1) {
      this.handleWebhooksProperties(properties);
    }

    const leases = webhooks.filter((webhook) => {
      webhook.event === 'lease_created' || webhook.event === 'lease_updated';
    });

    if (leases.length > 1) {
      this.handleWebhooksLeases(leases);
    }

    const invoices = webhooks.filter((webhook) => {
      webhook.event === 'invoice_created' || webhook.event === 'invoice_updated';
    });

    if (invoices.length > 1) {
      this.handleWebhooksInvoices(invoices);
    }
  }

  async handleWebhooksInvoices(invoices: Webhook[]) {
    for (const invoice of invoices) {
      const invoiceFromImobzi = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(invoice.id_entity_imobzi);

      await this.prisma.invoice.upsert({
        where: {
          id_imobzi: invoiceFromImobzi.id_imobzi,
        },
        update: invoiceFromImobzi,
        create: invoiceFromImobzi,
      });
    }
  }

  async handleWebhooksLeases(leases: Webhook[]) {
    for (const lease of leases) {
      const leaseFromImobzi = await this.imobziLeasesService.getRequiredLeaseDataToDb(lease.id_entity_imobzi);

      await this.prisma.lease.upsert({
        where: {
          id_imobzi: leaseFromImobzi.id_imobzi,
        },
        update: leaseFromImobzi,
        create: leaseFromImobzi,
      });
    }
  }

  async handleWebhooksProperties(properties: Webhook[]) {
    for (const property of properties) {
      const propertyFromImobzi = await this.imobziPropertiesService.getRequiredPropertyDataToDb(
        property.id_entity_imobzi,
      );

      await this.prisma.property.upsert({
        where: {
          id_imobzi: propertyFromImobzi.id_imobzi,
        },
        update: {
          ...propertyFromImobzi,
          owners: {
            deleteMany: {},
            createMany: { data: propertyFromImobzi.owners },
          },
        },
        create: {
          ...propertyFromImobzi,
          owners: { createMany: { data: propertyFromImobzi.owners } },
        },
      });
    }
  }

  async handleWebhooksContacts(contacts: Webhook[]) {
    const allContactsFromImobzi = await this.imobziContactsService.getAllContacts();

    for (const contact of contacts) {
      const contactFromImobzi = allContactsFromImobzi.find((contactImobzi) => {
        return contactImobzi.contact_id === contact.id_entity_imobzi;
      });

      if (contactFromImobzi.contact_type === 'person') {
        const personFromImobzi = await this.imobziPeopleService.getRequiredPersonDataToDb(contactFromImobzi.contact_id);
        await this.prisma.person.upsert({
          where: {
            id_imobzi: personFromImobzi.id_imobzi,
          },
          update: personFromImobzi,
          create: personFromImobzi,
        });
      }

      if (contactFromImobzi.contact_type === 'organization') {
        const orgFromImobzi = await this.imobziOrganizationsService.getRequiredOrganizationDataToDb(
          contactFromImobzi.contact_id,
        );
        await this.prisma.person.upsert({
          where: {
            id_imobzi: orgFromImobzi.id_imobzi,
          },
          update: orgFromImobzi,
          create: orgFromImobzi,
        });
      }
    }
  }
}
