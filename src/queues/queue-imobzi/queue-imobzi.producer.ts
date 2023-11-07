import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ImobziBuildingsRepository } from 'src/3party-client/imobzi/imobzi-buildings/imobziBuildings.repository';
import { ImobziContactsRepository } from 'src/3party-client/imobzi/imobzi-contacts/imobziContacts.repository';
import { ImobziInvoicesRepository } from 'src/3party-client/imobzi/imobzi-invoices/imobziInvoices.repository';
import { ImobziLeasesRepository } from 'src/3party-client/imobzi/imobzi-leases/imobziLeases.repository';
import { ImobziPropertiesRepository } from 'src/3party-client/imobzi/imobzi-properties/imobziProperties.repository';
import { InvoicesRepository } from 'src/repository/invoices/invoices.repository';

@Injectable()
export class QueueImobziProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziContactsRepository: ImobziContactsRepository,
    private readonly imobziBuildingsRepository: ImobziBuildingsRepository,
    private readonly imobziPropertiesRepository: ImobziPropertiesRepository,
    private readonly imobziLeasesRepository: ImobziLeasesRepository,
    private readonly imobziInvoicesRepository: ImobziInvoicesRepository,
    private readonly invoicesRepository: InvoicesRepository,
  ) {}

  async produceContacts() {
    try {
      const allContacts = await this.imobziContactsRepository.getAllContacts();

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
      const allBuildings = await this.imobziBuildingsRepository.getAllBuildings();

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
      const allProperties = await this.imobziPropertiesRepository.getAllProperties();

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
      const allLeases = await this.imobziLeasesRepository.getAllLeasesFromImobzi();

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
      const allInvoices = await this.imobziInvoicesRepository.getAllInvoicesFromImobzi();
      const immutableInvoices = await this.invoicesRepository.getImmutableInvoices();
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
