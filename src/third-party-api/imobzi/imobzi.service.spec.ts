import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziContactsService } from './imobzi-contacts/ImobziContacts.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziService } from './imobzi.service';

describe('ImobziService', () => {
  let imobziService: ImobziService;
  let prismaMock: {
    person: {
      update: jest.Mock;
      create: jest.Mock;
    };
    organization: {
      update: jest.Mock;
      create: jest.Mock;
    };
    property: {
      update: jest.Mock;
      create: jest.Mock;
    };
    lease: {
      update: jest.Mock;
      create: jest.Mock;
    };
    invoice: {
      update: jest.Mock;
      create: jest.Mock;
    };
  };

  let imobziContactsServiceMock: { getContactsDataToStoreOrUpdateDb: jest.Mock };
  let imobziLeasesServiceMock: { getPropertiesDataToStoreOrUpdateDb: jest.Mock };
  let imobziPropertiesServiceMock: { getLeasesDataToStoreOrUpdateDb: jest.Mock };
  let imobziInvoicesServiceMock: { getInvoicesDataToStoreOrUpdateDb: jest.Mock };

  beforeEach(async () => {
    prismaMock = {
      person: { create: jest.fn(), update: jest.fn() },
      organization: { create: jest.fn(), update: jest.fn() },
      lease: { create: jest.fn(), update: jest.fn() },
      invoice: { create: jest.fn(), update: jest.fn() },
      property: { create: jest.fn(), update: jest.fn() },
    };
    imobziContactsServiceMock = { getContactsDataToStoreOrUpdateDb: jest.fn() };
    imobziLeasesServiceMock = { getPropertiesDataToStoreOrUpdateDb: jest.fn() };
    imobziPropertiesServiceMock = { getLeasesDataToStoreOrUpdateDb: jest.fn() };
    imobziInvoicesServiceMock = { getInvoicesDataToStoreOrUpdateDb: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: ImobziContactsService, useValue: imobziContactsServiceMock },
        { provide: ImobziLeasesService, useValue: imobziLeasesServiceMock },
        { provide: ImobziPropertiesService, useValue: imobziPropertiesServiceMock },
        { provide: ImobziInvoicesService, useValue: imobziInvoicesServiceMock },
      ],
    }).compile();

    imobziService = moduleRef.get<ImobziService>(ImobziService);
  });
});
