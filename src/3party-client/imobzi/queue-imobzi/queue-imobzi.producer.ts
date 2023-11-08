import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BuildingDTO } from 'src/3party-client/imobzi/imobzi-buildings/dtos/imobziBuildings.dtos';
import { ContactDTO } from 'src/3party-client/imobzi/imobzi-contacts/dtos/imobziContacts.dtos';
import { AllImobziInvoiceDTO } from 'src/3party-client/imobzi/imobzi-invoices/dto/all-imobzi-invoice.dtos';
import { LeaseDTO } from 'src/3party-client/imobzi/imobzi-leases/dtos/imobziLeases.dtos';
import { PropertyDTO } from 'src/3party-client/imobzi/imobzi-properties/dtos/imobziProperties.dtos';
import { ImobziRepository } from 'src/3party-client/imobzi/imobzi.repository';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class QueueImobziProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziRepository: ImobziRepository,
    private readonly repositoryService: RepositoryService,
  ) {}

  async produceContacts() {
    try {
      const allContacts: ContactDTO[] = await this.imobziRepository.contact.getAll();

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
      const allBuildings: BuildingDTO[] = await this.imobziRepository.building.getAll();

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
      const allProperties: PropertyDTO[] = await this.imobziRepository.property.getAll();

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
      const allLeases: LeaseDTO[] = await this.imobziRepository.lease.getAll();

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
      const allInvoices: AllImobziInvoiceDTO[] = await this.imobziRepository.invoice.getAll();
      const immutableInvoicesIds = await this.repositoryService.invoices.inmutableInvoicesIds();
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
