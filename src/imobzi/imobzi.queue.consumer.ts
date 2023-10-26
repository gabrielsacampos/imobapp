import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ContactDTO } from 'src/imobzi/imobzi-contacts/imobziContacts.dtos';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { BuildingDTO } from './imobzi-buildings/imobziBuildings.dtos';
import { InvoicesDTO } from './imobzi-invoices/imobziInvoices.dtos';
import { LeaseDTO } from './imobzi-leases/imobziLeases.dtos';
import { PropertyDTO } from './imobzi-properties/imobziProperties.dtos';
import { ImobziService } from './imobzi.service';

@Processor('ImobziQueue')
export class ImobziQueueConsumer {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly failedQueueJobsService: FailedQueueJobsService,
  ) {}

  @Process('updatePeople')
  async updatePerson(job: Job<ContactDTO>) {
    try {
      const contact = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updatePerson(contact);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }

  @Process('updateOrganizations')
  async updateOrganization(job: Job<ContactDTO>) {
    try {
      const contact = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updateOrganization(contact);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }

  @Process('updateBuildings')
  async updateBuildings(job: Job<BuildingDTO>) {
    try {
      const building = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updateBuilding(building);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }

  @Process('updateProperties')
  async updateProperties(job: Job<PropertyDTO>) {
    try {
      const property = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updateProperty(property);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }

  @Process('updateLeases')
  async updateLease(job: Job<LeaseDTO>) {
    try {
      const lease = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updateLease(lease);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }

  @Process('updateInvoices')
  async updateInvoice(job: Job<InvoicesDTO>) {
    try {
      const invoice = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updateInvoice(invoice);
    } catch (error) {
      this.failedQueueJobsService.handleError(error, job);
      throw new Error(error);
    }
  }
}
