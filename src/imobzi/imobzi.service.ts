import { Injectable } from '@nestjs/common';
import { BuildingsService } from 'src/repository/buildings/buildings.service';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { CreateInvoiceItemDTO } from 'src/repository/invoices/invoice-items/dtos/create-invoice.dtos';
import { LeasesService } from 'src/repository/leases/leases.service';
import { OrganizationsService } from 'src/repository/organizations/organizations.service';
import { PeopleService } from 'src/repository/people/people.service';
import { PropertiesService } from 'src/repository/properties/properties.service';
import { BuildingDTO } from './imobzi-buildings/imobziBuildings.dtos';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ContactDTO } from './imobzi-contacts/imobziContacts.dtos';
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
    private readonly leasesService: LeasesService,
    private readonly propertiesService: PropertiesService,
    private readonly organizationsService: OrganizationsService,
    private readonly buildingsService: BuildingsService,
    private readonly peopleService: PeopleService,
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  async updatePerson(contactData: ContactDTO) {
    try {
      const personFromImobzi = await this.imobziPeopleService.getRequiredPersonDataToDb(contactData.contact_id);
      await this.peopleService.upsert(personFromImobzi);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateOrganization(contactData: ContactDTO) {
    try {
      const organizationFromImobzi = await this.imobziOrganizationsService.getRequiredOrganizationDataToDb(
        contactData.contact_id,
      );
      await this.organizationsService.upsert(organizationFromImobzi);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateBuilding(buildingData: BuildingDTO) {
    try {
      const buildingFromImobzi = await this.imobziBuildingsService.getRequiredBuildingDataToDb(buildingData);
      await this.buildingsService.upsert(buildingFromImobzi);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProperty(property: Partial<PropertyDTO>) {
    try {
      const propertyFromImobzi = await this.imobziPropertiesService.getRequiredPropertyDataToDb(property.db_id);
      await this.propertiesService.upsert(propertyFromImobzi);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateLease(leaseData: LeaseDTO) {
    try {
      const leaseFromImobzi = await this.imobziLeasesService.getRequiredLeaseDataToDb(leaseData.db_id.toString());
      await this.leasesService.upsert(leaseFromImobzi);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInvoices(invoiceData: InvoicesDTO | any): Promise<CreateInvoiceDTO> {
    try {
      const invoiceFromImobzi = await this.imobziInvoicesService.getRequiredInvoicesDataToDb(invoiceData.invoice_id);

      const interestItem: CreateInvoiceItemDTO = {
        id_invoice_imobzi: invoiceData.invoice_id,
        until_due_date: false,
        item_type: null,
        id_imobzi: invoiceFromImobzi.id_imobzi,
        description: 'Juros',
        behavior: 'charge_tenant_and_onlend',
        include_in_dimob: true,
        charge_management_fee: true,
        value: invoiceFromImobzi.interest_value,
      };

      const bankFeeItem: CreateInvoiceItemDTO = {
        id_invoice_imobzi: invoiceData.invoice_id,
        until_due_date: false,
        item_type: null,
        id_imobzi: `${invoiceFromImobzi.id_imobzi}-bank-fee`,
        description: 'Taxa de Boleto',
        behavior: 'bank_withheld',
        include_in_dimob: false,
        charge_management_fee: false,
        value: 0 - invoiceFromImobzi.bank_fee_value,
      };

      delete invoiceFromImobzi.interest_value;
      delete invoiceFromImobzi.bank_fee_value;

      if (interestItem.value !== 0) {
        invoiceFromImobzi.items.push(interestItem);
      }

      if (bankFeeItem.value !== 0) {
        invoiceFromImobzi.items.push(bankFeeItem);
      }

      return invoiceFromImobzi;
    } catch (error) {
      throw new Error(error);
    }
  }
}
