import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ImobziContactsService } from './imobzi-contacts/ImobziContacts.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.provider';

@Injectable()
export class ImobziQueueProducer {
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  async verifyEntitiesToUpdate() {
    const allContacts = await this.imobziContactsService.getAllContacts();

    const people = allContacts.filter((contact) => contact.contact_type === 'person');
    const organiations = allContacts.filter((contact) => contact.contact_type === 'organization');

    for (const person of people) {
      await this.imobziQueue.add('updatePeople', person, { delay: 3000 });
    }

    for (const org of organiations) {
      await this.imobziQueue.add('updateOrganizations', org, { delay: 3000 });
    }

    const allProperties = await this.imobziPropertiesService.getAllProperties();

    for (const property of allProperties) {
      await this.imobziQueue.add('updateProperties', property, { delay: 3000 });
    }

    const allLeases = await this.imobziLeasesService.getAllLeasesFromImobzi();

    for (const lease of allLeases) {
      await this.imobziQueue.add('updateLeases', lease, { delay: 3000 });
    }

    const allInvoices = await this.imobziInvoicesService.getAllInvoicesFromImobzi();

    for (const invoice of allInvoices) {
      await this.imobziQueue.add('updateProperties', invoice);
    }
  }
}
