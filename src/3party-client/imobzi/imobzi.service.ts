import { Injectable } from '@nestjs/common';
import { BuildingsController } from 'src/repository/buildings/buildings.controller';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { CreateInvoiceItemDto } from 'src/repository/invoice_items/dto/create-invoice_item.dto';
import { LeasesController } from 'src/repository/leases/leases.controller';
import { OrganizationsController } from 'src/repository/organizations/organizations.controller';
import { PeopleController } from 'src/repository/people/people.controller';
import { PeopleService } from 'src/repository/people/people.service';
import { PropertiesController } from 'src/repository/properties/properties.controller';
import { BuildingDTO } from './imobzi-buildings/dtos/imobziBuildings.dtos';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ContactDTO } from './imobzi-contacts/dtos/imobziContacts.dtos';
import { AnImobziInvoiceDTO } from './imobzi-invoices/dto/an-imobzi-invoice.dtos';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { LeaseDTO } from './imobzi-leases/dtos/imobziLeases.dtos';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { PropertyDTO } from './imobzi-properties/dtos/imobziProperties.dtos';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';

@Injectable()
export class ImobziService {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly imobziPeopleService: ImobziPeopleService, 
    // private readonly organizationsController: OrganizationsController,
    // private readonly propertiesController: PropertiesController,
  ) // private readonly leasesController: LeasesController,
  // private readonly buildingsController: BuildingsController,
  // private readonly peopleController: PeopleController,
  // private readonly imobziOrganizationsService: ImobziOrganizationsService,
  // private readonly imobziBuildingsService: ImobziBuildingsService,
  // private readonly imobziPropertiesService: ImobziPropertiesService,
  // private readonly imobziLeasesService: ImobziLeasesService,
  // private readonly imobziInvoicesService: ImobziInvoicesService,
  {}

  async upsertPerson(contactData: ContactDTO) {
    try {
      const personFromImobzi = await this.imobziPeopleService.getRequiredPersonDataToDb(contactData.contact_id);
      await this.peopleService.upsert(personFromImobzi);
    } catch (error) {
      throw new Error(error);
    }
  }
  // async updateOrganization(contactData: ContactDTO) {
  //   try {
  //     const organizationFromImobzi = await this.imobziOrganizationsService.getRequiredOrganizationDataToDb(
  //       contactData.contact_id,
  //     );
  //     await this.organizationsController.update(organizationFromImobzi);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async updateBuilding(buildingData: BuildingDTO) {
  //   try {
  //     const buildingFromImobzi = await this.imobziBuildingsService.getRequiredBuildingDataToDb(buildingData);
  //     await this.buildingsController.update(buildingFromImobzi);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async updateProperty(property: Partial<PropertyDTO>) {
  //   try {
  //     const propertyFromImobzi = await this.imobziPropertiesService.getRequiredPropertyDataToDb(property.db_id);
  //     await this.propertiesController.update(propertyFromImobzi);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async updateLease(leaseData: LeaseDTO) {
  //   try {
  //     const leaseFromImobzi = await this.imobziLeasesService.getRequiredLeaseDataToDb(leaseData.db_id.toString());
  //     await this.leasesController.update(leaseFromImobzi);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async updateInvoices(invoiceData: AnImobziInvoiceDTO | any): Promise<CreateInvoiceDTO> {
  //   try {
  //     const invoiceFromImobzi = await this.imobziInvoicesService.getInvoiceRequiredData(invoiceData.invoice_id);

  //     const interestItem: CreateInvoiceItemDto = {
  //       id_invoice_imobzi: invoiceData.invoice_id,
  //       until_due_date: false,
  //       item_type: null,
  //       id_imobzi: invoiceFromImobzi.id_imobzi,
  //       description: 'Juros',
  //       behavior: 'charge_tenant_and_onlend',
  //       include_in_dimob: true,
  //       charge_management_fee: true,
  //       value: invoiceFromImobzi.interest_value,
  //     };

  //     const bankFeeItem: CreateInvoiceItemDto = {
  //       id_invoice_imobzi: invoiceData.invoice_id,
  //       until_due_date: false,
  //       item_type: null,
  //       id_imobzi: `${invoiceFromImobzi.id_imobzi}-bank-fee`,
  //       description: 'Taxa de Boleto',
  //       behavior: 'bank_withheld',
  //       include_in_dimob: false,
  //       charge_management_fee: false,
  //       value: 0 - invoiceFromImobzi.bank_fee_value,
  //     };

  //     delete invoiceFromImobzi.interest_value;
  //     delete invoiceFromImobzi.bank_fee_value;

  //     if (interestItem.value !== 0) {
  //       invoiceFromImobzi.items.push(interestItem);
  //     }

  //     if (bankFeeItem.value !== 0) {
  //       invoiceFromImobzi.items.push(bankFeeItem);
  //     }

  //     return invoiceFromImobzi;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
