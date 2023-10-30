import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { SharedModule } from '../shared.module';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziContactsService } from './imobzi-contacts/ImobziContacts.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziService } from './imobzi.service';

describe('ImobziService', () => {
  let imobziService: ImobziService;
  let prismaMock: {
    person: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    organization: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    building: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    property: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    lease: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    invoice: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
  };

  let imobziContactsServiceMock: { getAllContacts: jest.Mock };
  let imobziPeopleServiceMock: { getRequiredPersonDataToDb: jest.Mock };
  let imobziOrganizationsServiceMock: { getRequiredOrganizationDataToDb: jest.Mock };
  let imobziBuildingsServiceMock: { getAllBuildings: jest.Mock; getRequiredBuildingDataToDb: jest.Mock };
  let imobziLeasesServiceMock: { getAllLeasesFromImobzi: jest.Mock; getRequiredLeaseDataToDb: jest.Mock };
  let imobziPropertiesServiceMock: { getAllProperties: jest.Mock; getRequiredPropertyDataToDb: jest.Mock };
  let imobziInvoicesServiceMock: { getAllInvoicesFromImobzi: jest.Mock; getRequiredInvoicesDataToDb: jest.Mock };

  beforeEach(async () => {
    prismaMock = {
      person: { findUnique: jest.fn(), upsert: jest.fn() },
      organization: { findUnique: jest.fn(), upsert: jest.fn() },
      building: { findUnique: jest.fn(), upsert: jest.fn() },
      lease: { findUnique: jest.fn(), upsert: jest.fn() },
      invoice: { findUnique: jest.fn(), upsert: jest.fn() },
      property: { findUnique: jest.fn(), upsert: jest.fn() },
    };
    imobziContactsServiceMock = { getAllContacts: jest.fn() };
    imobziPeopleServiceMock = { getRequiredPersonDataToDb: jest.fn() };
    imobziOrganizationsServiceMock = { getRequiredOrganizationDataToDb: jest.fn() };
    imobziBuildingsServiceMock = { getAllBuildings: jest.fn(), getRequiredBuildingDataToDb: jest.fn() };
    imobziLeasesServiceMock = { getAllLeasesFromImobzi: jest.fn(), getRequiredLeaseDataToDb: jest.fn() };
    imobziPropertiesServiceMock = { getAllProperties: jest.fn(), getRequiredPropertyDataToDb: jest.fn() };
    imobziInvoicesServiceMock = { getAllInvoicesFromImobzi: jest.fn(), getRequiredInvoicesDataToDb: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: ImobziContactsService, useValue: imobziContactsServiceMock },
        { provide: ImobziPeopleService, useValue: imobziPeopleServiceMock },
        { provide: ImobziOrganizationsService, useValue: imobziOrganizationsServiceMock },
        { provide: ImobziBuildingsService, useValue: imobziBuildingsServiceMock },
        { provide: ImobziLeasesService, useValue: imobziLeasesServiceMock },
        { provide: ImobziPropertiesService, useValue: imobziPropertiesServiceMock },
        // { provide: ImobziInvoicesService, useValue: imobziInvoicesServiceMock },
      ],
    }).compile();

    imobziService = moduleRef.get<ImobziService>(ImobziService);
  });

  // test('updatePerson', async () => {
  //   const personDataFromDb = { id_imobzi: '11111', updated_at: '2020-01-01' };
  //   prismaMock.person.findUnique.mockResolvedValue(personDataFromDb);

  //   const personFromApi = { id_imobzi: '11111', updated_at: '2024-01-01' };
  //   imobziPeopleServiceMock.getRequiredPersonDataToDb.mockResolvedValue(personFromApi);

  //   const contactDataInput = { contact_id: '11111', updated_at: '2024-01-01' };
  //   await imobziService.updatePerson(contactDataInput);
  //   expect(prismaMock.person.findUnique).toHaveBeenCalled();
  //   expect(prismaMock.person.upsert).toHaveBeenCalled();
  // });

  // test('updateOrganization', async () => {
  //   const organizationDataFromDb = { id_imobzi: '222222', updated_at: '2020-01-01' };
  //   prismaMock.organization.findUnique.mockResolvedValue(organizationDataFromDb);

  //   const organizationFromApi = { id_imobzi: '222222', updated_at: '2024-01-01' };
  //   imobziOrganizationsServiceMock.getRequiredOrganizationDataToDb.mockResolvedValue(organizationFromApi);

  //   const contactDataInput = { contact_id: '222222', updated_at: '2024-01-01' };
  //   await imobziService.updateOrganization(contactDataInput);
  //   expect(prismaMock.organization.findUnique).toHaveBeenCalled();
  //   expect(prismaMock.organization.upsert).toHaveBeenCalled();
  // });

  // test('updateBuilding', async () => {
  //   const BuildingDataFromDb = { id_imobzi: '3333333', updated_at: '2020-01-01' };
  //   prismaMock.building.findUnique.mockResolvedValue(BuildingDataFromDb);

  //   const BuildingFromApi = { db_id: 3333333, updated_at: '2024-01-01' };
  //   imobziBuildingsServiceMock.getAllBuildings.mockResolvedValue(BuildingFromApi);
  //   imobziBuildingsServiceMock.getRequiredBuildingDataToDb.mockResolvedValue(BuildingFromApi);

  //   const buildingData = { db_id: '3333333', updated_at: '2024-01-01' };
  //   await imobziService.updateBuilding(buildingData);
  //   expect(prismaMock.building.findUnique).toHaveBeenCalled();
  //   expect(prismaMock.building.upsert).toHaveBeenCalled();
  // });

  // test('updateProperty', async () => {
  //   const propertyDataFromDb = { id_imobzi: '44444444', updated_at: '2020-01-01' };
  //   prismaMock.property.findUnique.mockResolvedValue(propertyDataFromDb);

  //   const propertyFromApi = { db_id: 44444444, updated_at: '2024-01-01' };
  //   imobziPropertiesServiceMock.getAllProperties.mockResolvedValue(propertyFromApi);
  //   imobziPropertiesServiceMock.getRequiredPropertyDataToDb.mockResolvedValue(propertyFromApi);

  //   const propertyData = { db_id: '44444444', updated_at: '2024-01-01' };
  //   await imobziService.updateProperty(propertyData);
  //   expect(prismaMock.property.findUnique).toHaveBeenCalled();
  //   expect(prismaMock.property.upsert).toHaveBeenCalled();
  // });

  // test('updateLease', async () => {
  //   const leaseDataFromDb = { id_imobzi: '555555555', updated_at: '2020-01-01' };
  //   prismaMock.lease.findUnique.mockResolvedValue(leaseDataFromDb);

  //   const leaseFromApi = { db_id: 555555555, updated_at: '2024-01-01' };
  //   imobziLeasesServiceMock.getAllLeasesFromImobzi.mockResolvedValue(leaseFromApi);
  //   imobziLeasesServiceMock.getRequiredLeaseDataToDb.mockResolvedValue(leaseFromApi);

  //   const leaseData = { db_id: 555555555 };
  //   await imobziService.updateLease(leaseData);
  //   expect(prismaMock.lease.findUnique).toHaveBeenCalled();
  //   expect(prismaMock.lease.upsert).toHaveBeenCalled();
  // });

  test('updateInvoice', async () => {
    // const invoiceDataFromDb = { id_imobzi: 'abc', status: 'pending' };
    // prismaMock.invoice.findUnique.mockResolvedValue(invoiceDataFromDb);

    // const invoiceFromApi = { db_id: 'abc', updated_at: 'paid' };
    // imobziInvoicesServiceMock.getAllInvoicesFromImobzi.mockResolvedValue(invoiceFromApi);
    // imobziInvoicesServiceMock.getRequiredInvoicesDataToDb.mockResolvedValue(invoiceFromApi);

    // const invoiceData = { invoice_id: 'abc' };
    // await imobziService.updateInvoice(invoiceData);
    // expect(prismaMock.invoice.findUnique).toHaveBeenCalled();
    // expect(prismaMock.invoice.upsert).toHaveBeenCalled();
    imobziService.updateInvoice('653d99c054ab11eda86b13cb5bf0c9b6');
  });
});
