import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ContactDTO } from 'src/third-party-api/imobzi/imobzi-contacts/imobziContacts.dtos';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { InvoicesDTO } from './imobzi-invoices/imobziInvoices.dtos';
import { LeaseDTO } from './imobzi-leases/imobziLeases.dtos';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { PropertyDTO } from './imobzi-properties/imobziProperties.dtos';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.provider';

import { ImobziService } from './imobzi.service';

@Processor('ImobziQueue')
export class ImobziQueueConsumer {
  constructor(
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziService: ImobziService,
  ) {}

  @Process('updatePeople')
  async updatePerson(job: Job<ContactDTO>) {
    const contact = job.data;
    await this.imobziService.updatePerson(contact);
  }

  @Process('updateOrganizations')
  async updateOrganization(job: Job<ContactDTO>) {
    const contact = job.data;
    await this.imobziService.updateOrganization(contact);
  }

  @Process('updateProperties')
  async updateProperties(job: Job<PropertyDTO>) {
    const property = job.data;
    await this.imobziService.updatePropertyAndBuilding(property);
  }

  @Process('updateLeases')
  async updateLease(job: Job<LeaseDTO>) {
    const lease = job.data;
    await this.imobziService.updateLease(lease);
  }

  @Process('updateInvoices')
  async updateInvoice(job: Job<InvoicesDTO>) {
    const invoice = job.data;
    await this.imobziService.updateInvoice(invoice);
  }
}
