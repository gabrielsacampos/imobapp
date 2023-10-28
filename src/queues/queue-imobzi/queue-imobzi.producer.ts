import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { ImobziBuildingsService } from '../../imobzi/imobzi-buildings/imobziBuildings.service';
import { ImobziContactsService } from '../../imobzi/imobzi-contacts/imobziContacts.service';
import { ImobziInvoicesService } from '../../imobzi/imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from '../../imobzi/imobzi-leases/imobziLeases.service';
import { ImobziPropertiesService } from '../../imobzi/imobzi-properties/imobziProperties.service';

@Injectable()
export class QueueImobziProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
    private readonly invoicesService: InvoicesService,
  ) {}

  async produceContacts() {
    try {
      const allContacts = await this.imobziContactsService.getAllContacts();

      const people = allContacts.filter((contact) => contact.contact_type === 'person');
      const organiations = allContacts.filter((contact) => contact.contact_type === 'organization');

      for (const person of people) {
        await this.imobziQueue.add('updatePeople', person, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }

      for (const org of organiations) {
        await this.imobziQueue.add('updateOrganizations', org, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async produceBuildings() {
    try {
      const allBuildings = await this.imobziBuildingsService.getAllBuildings();

      for (const building of allBuildings) {
        await this.imobziQueue.add('updateBuildings', building, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async produceProperties() {
    try {
      const allProperties = await this.imobziPropertiesService.getAllProperties();

      for (const property of allProperties) {
        await this.imobziQueue.add('updateProperties', property, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async produceLeases() {
    try {
      const allLeases = await this.imobziLeasesService.getAllLeasesFromImobzi();

      for (const lease of allLeases) {
        await this.imobziQueue.add('updateLeases', lease, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async produceInvoices() {
    try {
      const allInvoices = await this.imobziInvoicesService.getAllInvoicesFromImobzi();
      const immutableInvoices = await this.invoicesService.getImmutableInvoices();
      const immutableInvoicesIds = immutableInvoices.map((invoice) => invoice.invoice_id);
      const invoicesToUpsert = allInvoices.filter((invoice) => {
        return !immutableInvoicesIds.includes(invoice.invoice_id);
      });

      for (const invoice of invoicesToUpsert) {
        await this.imobziQueue.add('updateInvoices', invoice, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
