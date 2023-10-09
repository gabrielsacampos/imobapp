import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziContactsService } from './imobzi-contacts/imobziContacts.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';

@Injectable()
export class ImobziQueueProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  async verifyEntitiesToUpdate() {
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

      const allBuildings = await this.imobziBuildingsService.getAllBuildings();

      for (const building of allBuildings) {
        await this.imobziQueue.add('updateBuildings', building, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }

      const allProperties = await this.imobziPropertiesService.getAllProperties();

      for (const property of allProperties) {
        await this.imobziQueue.add('updateProperties', property, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }

      const allLeases = await this.imobziLeasesService.getAllLeasesFromImobzi();

      for (const lease of allLeases) {
        await this.imobziQueue.add('updateLeases', lease, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }

      const allInvoices = await this.imobziInvoicesService.getAllInvoicesFromImobzi();

      for (const invoice of allInvoices) {
        await this.imobziQueue.add('updateInvoices', invoice, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
