import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { BuildingDTO } from 'src/3party-client/imobzi/imobzi-buildings/dtos/imobziBuildings.dtos';
import { ContactDTO } from 'src/3party-client/imobzi/imobzi-contacts/dtos/imobziContacts.dtos';
import { AllImobziInvoiceDTO } from 'src/3party-client/imobzi/imobzi-invoices/dto/all-imobzi-invoice.dtos';
import { LeaseDTO } from 'src/3party-client/imobzi/imobzi-leases/dtos/imobziLeases.dtos';
import { PropertyDTO } from 'src/3party-client/imobzi/imobzi-properties/dtos/imobziProperties.dtos';
import { ImobziRepository } from 'src/3party-client/imobzi/imobzi.repository';
import { ModulesServices } from 'src/modules/modules.service';

@Injectable()
export class QueueImobziProducer {
  private logger = new Logger('QueueImobziProducer');
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziRepository: ImobziRepository,
    private readonly repositoryService: ModulesServices,
  ) {}

  async produceContacts() {
    try {
      this.logger.verbose('.produceContacts() running');
      const allContacts: ContactDTO[] = await this.imobziRepository.contact.getAll();

      const people = allContacts.filter((contact) => contact.contact_type === 'person');
      this.logger.verbose(`${people.length} people catched from Imobzi`);

      const organizations = allContacts.filter((contact) => contact.contact_type === 'organization');
      this.logger.verbose(`${organizations.length} organizations catched from Imobzi`);

      for (const person of people) {
        await this.imobziQueue.add('updatePeople', person, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }

      for (const org of organizations) {
        await this.imobziQueue.add('updateOrganizations', org, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(`Failed on produceContacts(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }

  async produceBuildings() {
    try {
      this.logger.verbose('.produceBuildings() running');
      const allBuildings: BuildingDTO[] = await this.imobziRepository.building.getAll();

      for (const building of allBuildings) {
        await this.imobziQueue.add('updateBuildings', building, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(`Failed on produceBuildings(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }

  async produceProperties() {
    try {
      this.logger.verbose('.produceProperties() running');
      const allProperties: PropertyDTO[] = await this.imobziRepository.property.getAll();

      for (const property of allProperties) {
        await this.imobziQueue.add('updateProperties', property, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(`Failed on produceProperties(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }

  async produceLeases() {
    try {
      this.logger.verbose('.produceLeases() running');
      const allLeases: LeaseDTO[] = await this.imobziRepository.lease.getAll();

      for (const lease of allLeases) {
        await this.imobziQueue.add('updateLeases', lease, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(`Failed on produceLeases(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }

  async produceInvoices() {
    try {
      this.logger.verbose('.produceInvoices() running');
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
      this.logger.error(`Failed on produceInvoices(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }
}
