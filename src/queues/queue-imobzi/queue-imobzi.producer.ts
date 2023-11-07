import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ImobziRepositories } from 'src/3party-client/imobzi/imobzi.repositories';
import { RepositoryServices } from 'src/repository/repository.services';

@Injectable()
export class QueueImobziProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziRepository: ImobziRepository,
    private readonly repositoryServices: RepositoryServices,
  ) {}
  contacts = {
    async produce() {
      try {
        const allContacts = await this.imobziRepository.contact.getAll();

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
    },
  };

  buildings = {
    async produce() {
      try {
        const allBuildings = await this.imobziRepository.building.getAll();

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
    },
  };

  properties = {
    async produce() {
      try {
        const allProperties = await this.imobziRepository.property.getAll();

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
    },
  };

  leases = {
    async produce() {
      try {
        const allLeases = await this.imobziRepository.lease.getAll();

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
    },
  };

  invoices = {
    async produce() {
      try {
        const allInvoices = await this.imobziRepository.invoice.getAll();
        const immutableInvoices = await this.repositoryService.invoices.inmutableInvoices();
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
    },
  };
}
