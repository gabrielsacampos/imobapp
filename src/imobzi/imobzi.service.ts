import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ItemsInvoiceCreateDTO } from 'src/repository/modules/invoices/invoice-items/invoice-items.dtos';
import { BuildingDTO } from './imobzi-buildings/imobziBuildings.dtos';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ContactDTO } from './imobzi-contacts/imobziContacts.dtos';
import { ImobziContactsService } from './imobzi-contacts/imobziContacts.service';
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
    private readonly imobziContacts: ImobziContactsService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  async updateOrganization(contactData: ContactDTO) {
    try {
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
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateBuilding(buildingData: BuildingDTO) {
    try {
      const organizationFromApi = await this.imobziBuildingsService.getRequiredBuildingDataToDb(buildingData);
      await this.prisma.building.upsert({
        where: {
          id_imobzi: organizationFromApi.id_imobzi,
        },
        update: organizationFromApi,
        create: organizationFromApi,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateProperty(property: Partial<PropertyDTO>) {
    try {
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
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  //we need to request each lease detail to get update date
  async updateLease(leaseData: LeaseDTO) {
    try {
      const leaseFromApi = await this.imobziLeasesService.getRequiredLeaseDataToDb(leaseData.db_id.toString());
      const beneficiaries = leaseFromApi.beneficiaries;
      const leaseItems = leaseFromApi.lease_items;

      delete leaseFromApi.lease_items;
      delete leaseFromApi.beneficiaries;

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
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }

  async updateInvoice(invoiceData: InvoicesDTO | any) {
    try {
      const invoiceFromApi = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(invoiceData.invoice_id);
      const items: ItemsInvoiceCreateDTO[] = invoiceFromApi.items;
      delete invoiceFromApi.items;

      const interestItem: ItemsInvoiceCreateDTO = {
        until_due_date: false,
        item_type: null,
        id_imobzi: invoiceFromApi.id_imobzi,
        description: 'Juros',
        behavior: 'charge_tenant_and_onlend',
        include_in_dimob: true,
        charge_management_fee: true,
        value: invoiceFromApi.interest_value,
      };

      const bankFeeItem: ItemsInvoiceCreateDTO = {
        until_due_date: false,
        item_type: null,
        id_imobzi: `${invoiceFromApi.id_imobzi}-bank-fee`,
        description: 'Taxa de Boleto',
        behavior: 'bank_withheld',
        include_in_dimob: false,
        charge_management_fee: false,
        value: 0 - invoiceFromApi.bank_fee_value,
      };

      delete invoiceFromApi.interest_value;
      delete invoiceFromApi.bank_fee_value;

      await this.prisma.invoice.upsert({
        where: {
          id_imobzi: invoiceFromApi.id_imobzi,
        },
        update: invoiceFromApi,
        create: { ...invoiceFromApi, invoiceItems: { createMany: { data: items } } },
      });

      if (interestItem.value > 0) {
        await this.prisma.invoiceItem.create({
          data: { id_invoice_imobzi: invoiceFromApi.id_imobzi, ...interestItem },
        });
      }

      if (bankFeeItem.value !== 0) {
        await this.prisma.invoiceItem.create({
          data: { id_invoice_imobzi: invoiceFromApi.id_imobzi, ...bankFeeItem },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${error}`);
    }
  }
}
