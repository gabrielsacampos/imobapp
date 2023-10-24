import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ContactDTO } from 'src/imobzi/imobzi-contacts/imobziContacts.dtos';
import { BuildingDTO } from './imobzi-buildings/imobziBuildings.dtos';
import { ImobziWebhookDTO } from './imobzi-dtos/imobziWebhook.dtos';
import { InvoicesDTO } from './imobzi-invoices/imobziInvoices.dtos';
import { LeaseDTO } from './imobzi-leases/imobziLeases.dtos';
import { PropertyDTO } from './imobzi-properties/imobziProperties.dtos';
import { ImobziService } from './imobzi.service';

@Processor('ImobziQueue')
export class ImobziQueueConsumer {
  constructor(private readonly imobziService: ImobziService) {}

  // @Process('updatePeople')
  // async updatePerson(job: Job<ContactDTO>) {
  //   const contact = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updatePerson(contact);
  // }

  // @Process('updateOrganizations')
  // async updateOrganization(job: Job<ContactDTO>) {
  //   const contact = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updateOrganization(contact);
  // }

  // @Process('updateBuildings')
  // async updateBuildings(job: Job<BuildingDTO>) {
  //   const building = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updateBuilding(building);
  // }

  // @Process('updateProperties')
  // async updateProperties(job: Job<PropertyDTO>) {
  //   const property = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updateProperty(property);
  // }

  // @Process('updateLeases')
  // async updateLease(job: Job<LeaseDTO>) {
  //   const lease = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updateLease(lease);
  // }

  // @Process('updateInvoices')
  // async updateInvoice(job: Job<InvoicesDTO>) {
  //   const invoice = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   await this.imobziService.updateInvoice(invoice);
  // }

  // @Process('handleWebhook')
  // async handleWebhook(job: Job<ImobziWebhookDTO>) {
  //   const webhookData = job.data;
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   // await this.imobziService.handleWebhooks(webhookData);
  // }
}
