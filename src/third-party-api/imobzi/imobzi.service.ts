import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/database/prisma.service';
import { ItemsInvoiceCreateDTO } from 'src/modules/invoices/invoice-items/invoice-items.dtos';
import { BuildingDTO } from './imobzi-buildings/imobziBuildings.dtos';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ContactDTO } from './imobzi-contacts/imobziContacts.dtos';
import { ImobziWebhookDTO } from './imobzi-dtos/imobziWebhook.dtos';
import { InvoicesDTO } from './imobzi-invoices/imobziInvoices.dtos';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { LeaseDTO } from './imobzi-leases/imobziLeases.dtos';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { PropertyDTO } from './imobzi-properties/imobziProperties.dtos';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';

@Injectable()
export class ImobziService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  async handleWebhook(data: ImobziWebhookDTO) {
    let updateDone: boolean = false;

    switch (data.event) {
      case 'contact_created':
      case 'contact_updated':
        const person = await this.imobziPeopleService.getRequiredPersonDataToDb(data.db_id);
        await this.prisma.person.upsert({
          where: {
            id_imobzi: person.id_imobzi,
          },
          update: person,
          create: person,
        });

        if (person) {
          updateDone = true;
          break;
        }

        const organization = await this.imobziOrganizationsService.getRequiredOrganizationDataToDb(data.db_id);
        await this.updateOrganization(organization);
        updateDone = true;
        break;

      case 'property_created' || 'property_updated':
        const property = await this.imobziPropertiesService.getRequiredPropertyDataToDb(data.db_id);
        await this.updateProperty(property);
        updateDone = true;
        break;

      case 'lease_created' || 'lease_updated':
        const lease = await this.imobziLeasesService.getRequiredLeaseDataToDb(data.db_id);
        await this.updateLease(lease);
        updateDone = true;
        break;

      case 'invoice_created' || 'invoice_updated':
        const invoice = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(data.db_id);
        await this.updateInvoice(invoice);
        updateDone = true;
        break;
    }

    await this.prisma.webhook.create({
      data: { event: data.event, id_entity_imobzi: data.db_id, done: updateDone },
    });
  }

  async updatePerson(contactData: ContactDTO) {
    try {
      const personOnDb = await this.prisma.person.findUnique({
        where: { id_imobzi: contactData.contact_id.toString() },
      });

      if (!personOnDb || new Date(personOnDb?.updated_at) < new Date(contactData.updated_at)) {
        const personFromApi = await this.imobziPeopleService.getRequiredPersonDataToDb(contactData.contact_id);
        await this.prisma.person.upsert({
          where: {
            id_imobzi: personFromApi.id_imobzi,
          },
          update: personFromApi,
          create: personFromApi,
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateOrganization(contactData: ContactDTO) {
    try {
      const organizationsOnDb = await this.prisma.organization.findUnique({
        where: { id_imobzi: contactData.contact_id.toString() },
      });

      if (!organizationsOnDb || new Date(organizationsOnDb?.updated_at) < new Date(contactData.updated_at)) {
        const organizationFromApi = await this.imobziOrganizationsService.getRequiredOrganizationDataToDb(
          contactData.contact_id,
        );
        await this.prisma.organization.upsert({
          where: {
            id_imobzi: organizationFromApi.id_imobzi,
          },
          update: organizationFromApi,
          create: organizationFromApi,
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateBuilding(buildingData: BuildingDTO) {
    try {
      const buildingsOnDb = await this.prisma.building.findUnique({
        where: { id_imobzi: buildingData.db_id.toString() },
      });

      if (!buildingsOnDb || new Date(buildingsOnDb?.updated_at) < new Date(buildingData.updated_at)) {
        const organizationFromApi = await this.imobziBuildingsService.getRequiredBuildingDataToDb(buildingData);
        await this.prisma.building.upsert({
          where: {
            id_imobzi: organizationFromApi.id_imobzi,
          },
          update: organizationFromApi,
          create: organizationFromApi,
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateProperty(property: PropertyDTO) {
    try {
      const propertyOnDb = await this.prisma.property.findUnique({
        where: { id_imobzi: property.db_id.toString() },
      });

      if (!propertyOnDb || new Date(propertyOnDb?.updated_at) < new Date(property.updated_at)) {
        const propertyFromApi = await this.imobziPropertiesService.getRequiredPropertyDataToDb(property.db_id);
        await this.prisma.property.upsert({
          where: {
            id_imobzi: propertyFromApi.id_imobzi,
          },
          update: {
            ...propertyFromApi,
            owners: {
              deleteMany: {},
              createMany: { data: propertyFromApi.owners },
            },
          },
          create: {
            ...propertyFromApi,
            owners: { createMany: { data: propertyFromApi.owners } },
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  //we need to request each lease detail to get update date
  async updateLease(leaseData: LeaseDTO) {
    try {
      const leaseOnDb = await this.prisma.lease.findUnique({
        where: { id_imobzi: leaseData.db_id.toString() },
      });
      const leaseFromApi = await this.imobziLeasesService.getRequiredLeaseDataToDb(leaseData.db_id.toString());
      const beneficiaries = leaseFromApi.beneficiaries;
      const leaseItems = leaseFromApi.lease_items;

      delete leaseFromApi.lease_items;
      delete leaseFromApi.beneficiaries;

      if (!leaseOnDb || new Date(leaseOnDb?.updated_at) < new Date(leaseFromApi.updated_at)) {
        await this.prisma.lease.upsert({
          where: {
            id_imobzi: leaseFromApi.id_imobzi,
          },
          update: {
            ...leaseFromApi,
            beneficiariesLease: {
              deleteMany: {},
              createMany: { data: beneficiaries },
            },
            leasesItems: {
              deleteMany: {},
              createMany: { data: leaseItems },
            },
          },
          create: {
            ...leaseFromApi,
            beneficiariesLease: {
              createMany: { data: beneficiaries },
            },
            leasesItems: {
              createMany: { data: leaseItems },
            },
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateInvoice(invoiceData: InvoicesDTO) {
    try {
      const invoiceOnDb = await this.prisma.invoice.findUnique({
        where: { id_imobzi: invoiceData.invoice_id },
      });

      if (
        !invoiceOnDb ||
        invoiceOnDb.status !== invoiceData.status ||
        invoiceOnDb.total_value !== invoiceData.total_value ||
        invoiceOnDb.paid_at !== invoiceData.paid_at
      ) {
        const invoiceFromApi = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(invoiceData.invoice_id);
        const items: ItemsInvoiceCreateDTO[] = invoiceFromApi.items;
        delete invoiceFromApi.items;

        await this.prisma.invoice.upsert({
          where: {
            id_imobzi: invoiceFromApi.id_imobzi,
          },
          update: invoiceFromApi,
          create: {
            ...invoiceFromApi,
            invoiceItems: { createMany: { data: items } },
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }
}
