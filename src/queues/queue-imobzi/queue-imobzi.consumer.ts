import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BuildingDTO } from 'src/imobzi/imobzi-buildings/imobziBuildings.dtos';
import { ContactDTO } from 'src/imobzi/imobzi-contacts/imobziContacts.dtos';
import { InvoicesDTO } from 'src/imobzi/imobzi-invoices/imobziInvoices.dtos';
import { LeaseDTO } from 'src/imobzi/imobzi-leases/imobziLeases.dtos';
import { PropertyDTO } from 'src/imobzi/imobzi-properties/imobziProperties.dtos';
import { ImobziService } from 'src/imobzi/imobzi.service';
import { InvoicesService } from 'src/repository/invoices/invoices.service';

@Processor('ImobziQueue')
export class QueueImobziConsumer {
  constructor(
    private readonly imobziService: ImobziService,
    private readonly invoicesService: InvoicesService,
  ) {}

  @Process('updatePeople')
  async updatePerson(job: Job<ContactDTO>) {
    try {
      const contact = job.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.imobziService.updatePerson(contact);
    } catch (error) {
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
      throw new Error(error);
    }
  }

  @Process('updateInvoices')
  async updateInvoice(job: Job<InvoicesDTO>) {
    try {
      const invoice = job.data;
      const invoicesToDb = await this.imobziService.prepareToDb(invoice);
      await this.invoicesService.upsert(invoicesToDb);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }
}
