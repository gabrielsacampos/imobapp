import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BuildingDTO } from 'src/3party-client/imobzi/imobzi-buildings/dtos/imobziBuildings.dtos';
import { ContactDTO } from 'src/3party-client/imobzi/imobzi-contacts/dtos/imobziContacts.dtos';
import { AnImobziInvoiceDTO } from 'src/3party-client/imobzi/imobzi-invoices/dto/an-imobzi-invoice.dtos';
import { LeaseDTO } from 'src/3party-client/imobzi/imobzi-leases/dtos/imobziLeases.dtos';
import { PropertyDTO } from 'src/3party-client/imobzi/imobzi-properties/dtos/imobziProperties.dtos';
import { ImobziService } from 'src/3party-client/imobzi/imobzi.service';
import { CreateBuildingDTO } from 'src/modules/buildings/dtos/create-building.dtos';
import { CreateInvoiceDTO } from 'src/modules/invoices/dtos/create-invoice.dtos';
import { CreateLeaseDTO } from 'src/modules/leases/dtos/create-lease.dtos';
import { CreateOrganizationDTO } from 'src/modules/organizations/dtos/create-organization.dtos';
import { CreatePersonDTO } from 'src/modules/people/dtos/create-person.dtos';
import { CreatePropertyDTO } from 'src/modules/properties/dtos/create-property.dtos';
import { ModulesServices } from 'src/modules/modules.service';

@Processor('ImobziQueue')
export class QueueImobziConsumer {
  constructor(
    private readonly modulesServices: ModulesServices,
    private readonly imobziService: ImobziService,
  ) {}

  @Process('updatePeople')
  async updatePerson(job: Job<ContactDTO>) {
    try {
      const contact = job.data;
      const formatedPerson: CreatePersonDTO = await this.imobziService.person.getRequiredData(contact.contact_id);
      await this.modulesServices.people.upsert(formatedPerson);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('updateOrganizations')
  async updateOrganization(job: Job<ContactDTO>) {
    try {
      const contact = job.data;
      const formatedOrg: CreateOrganizationDTO = await this.imobziService.organization.getRequiredData(
        contact.contact_id,
      );
      await this.modulesServices.organizations.upsert(formatedOrg);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('updateBuildings')
  async updateBuildings(job: Job<BuildingDTO>) {
    try {
      const building = job.data;
      const formatedBuilding: CreateBuildingDTO = this.imobziService.building.getRequiredData(building);
      await this.modulesServices.buildings.upsert(formatedBuilding);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('updateProperties')
  async updateProperties(job: Job<PropertyDTO>) {
    try {
      const property = job.data;
      const formatedProperty: CreatePropertyDTO = await this.imobziService.property.getRequiredData(property.db_id);
      await this.modulesServices.properties.upsert(formatedProperty);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('updateLeases')
  async updateLease(job: Job<LeaseDTO>) {
    try {
      const lease = job.data;
      const formatedLease: CreateLeaseDTO = await this.imobziService.lease.getRequiredData(lease.db_id.toString());
      await this.modulesServices.leases.upsert(formatedLease);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('updateInvoices')
  async updateInvoice(job: Job<AnImobziInvoiceDTO>) {
    try {
      const invoice = job.data;
      const formatedInvoice: CreateInvoiceDTO = await this.imobziService.invoice.getRequiredData(invoice.invoice_id);
      await this.modulesServices.invoices.upsert(formatedInvoice);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      throw new Error(error);
    }
  }
}
