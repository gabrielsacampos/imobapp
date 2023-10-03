import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ContactDTO } from './imobzi-contacts/imobziContacts.dtos';
import { InvoicesDTO } from './imobzi-invoices/imobziInvoices.dtos';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { LeaseDTO } from './imobzi-leases/imobziLeases.dtos';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { PropertyDTO } from './imobzi-properties/imobziProperties.dtos';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.provider';

@Injectable()
export class ImobziService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

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
      throw new Error(`erro ao processar a fila - ${error}`);
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
      // console.error(contactData);
      // console.error(contactData.cnpj);
      // console.error(contactData.contact_id);
      // console.log(error)
      throw new Error(`erro ao processar a fila - ${error}`);
    }
  }

  async updatePropertyAndBuilding(property: PropertyDTO) {
    try {
      const propertyOnDb = await this.prisma.organization.findUnique({
        where: { id_imobzi: property.db_id.toString() },
      });

      if (!propertyOnDb || new Date(propertyOnDb?.updated_at) < new Date(property.updated_at)) {

        const propertyFromApi = await this.imobziPropertiesService.getRequiredPropertyDataToDb(property.db_id);
        const buildingFromProperty = this.imobziBuildingsService.getRequiredBuildingDataToDb(propertyFromApi)

        await this.prisma.building.upsert({
          where: {id_imobzi: propertyFromApi.}
        })
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
      throw new Error(`erro ao processar a fila - ${error}`);
    }
  }

  //we need to request each lease detail to get update date
  async updateLease(lease: LeaseDTO) {
    try {
      const leaseOnDb = await this.prisma.lease.findUnique({
        where: { id_imobzi: lease.db_id.toString() },
      });
      const leaseFromApi = await this.imobziLeasesService.getRequiredLeaseDataToDb(lease.db_id.toString());
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
      throw new Error(`erro ao processar a fila - ${error}`);
    }
  }

  async updateInvoice(invoice: InvoicesDTO) {
    try {
      const invoiceOnDb = await this.prisma.invoice.findUnique({
        where: { id_imobzi: invoice.invoice_id },
      });

      if (
        !invoiceOnDb ||
        invoiceOnDb.status !== invoice.status ||
        invoiceOnDb.total_value !== invoice.total_value ||
        invoiceOnDb.paid_at !== invoice.paid_at
      ) {
        const invoiceFromApi = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(invoice.invoice_id);
        await this.prisma.invoice.upsert({
          where: {
            id_imobzi: invoiceFromApi.id_imobzi,
          },
          update: invoiceFromApi,
          create: {
            ...invoiceFromApi,
            invoiceItems: { createMany: { data: invoiceFromApi.items } },
          },
        });
      }
    } catch (error) {
      throw new Error(`erro ao processar a fila - ${error}`);
    }
  }
}
