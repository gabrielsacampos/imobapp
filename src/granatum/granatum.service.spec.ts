import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumService } from './granatum.service';
import { accountsMocks } from './granatum-accounts/granatum-accounts.mocks';
import { categoriesMocks } from './granatum-categories/granatumCategories.mocks';
import { costCentersMock } from './granatum-cost-center/granatum-cost-center.mocks';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { getCreditInvoicesByPeriodMock, setGranatumIdsIntoInvoicesMock } from './granatum.service.mocks';

describe('GranatumTransactionsService', () => {
  let granatumService: GranatumService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let prismaMock: { invoice: { findMany: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    prismaMock = { invoice: { findMany: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        GranatumService,
        GranatumCategoriesService,
        GranatumTransactionsService,
        GranatumCostCenterService,
        GranatumAccountsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    granatumService = moduleRef.get<GranatumService>(GranatumService);
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      if (url.includes('categorias')) {
        return Promise.resolve({ data: categoriesMocks });
      } else if (url.includes('centros_custo_lucro')) {
        return Promise.resolve({ data: costCentersMock });
      } else if (url.includes('contas')) {
        return Promise.resolve({ data: accountsMocks });
      } else {
        return Promise.reject({ message: `verify url ${url}` });
      }
    });
    prismaMock.invoice.findMany.mockResolvedValue(getCreditInvoicesByPeriodMock);
  });

  // test('setItemsGranatumCategoriesId', async () => {
  //   const result = await granatumService.setItemsGranatumCategoriesId([
  //     { description: 'aluguel' },
  //     { description: 'iptu' },
  //   ]);
  //   expect(result).toEqual([
  //     { description: 'aluguel', id_category_granatum: 1846027 },
  //     { description: 'iptu', id_category_granatum: 1843892 },
  //   ]);
  // });

  // test('setAccountGranatumId', async () => {
  //   const result = await granatumService.setAccountGranatumId('Inter');
  //   expect(result).toBe(103796);
  // });

  // test('setCostCenterGramatumId', async () => {
  //   const result1 = await granatumService.setCostCenterGranatumId({
  //     building: { name: 'Itália' },
  //     property_block: null,
  //   });
  //   expect(result1).toBe(244549);

  //   const result2 = await granatumService.setCostCenterGranatumId({
  //     building: { name: 'Eko Home Club' },
  //     property_block: 'Ipê',
  //   });
  //   expect(result2).toBe(244547);

  //   const result3 = await granatumService.setCostCenterGranatumId({
  //     building: { name: 'Mont Serrat' },
  //     property_block: 'B',
  //   });
  //   expect(result3).toBe(244554);
  // });

  // test('getCreditInvoicesByPeriod', async () => {
  //   const result = await granatumService.getCreditInvoicesByPeriod('2023-05-01', '2023-05-31');
  //   expect(result).toBeDefined();
  // });

  test('syncGranatumWithImobziInvoices', async () => {
    const result = await granatumService.setGranatumIdsIntoInvoices('2023-05-01', '2023-05-31');
    console.log(JSON.stringify(result, null, 2));
    // expect(result).toEqual(setGranatumIdsIntoInvoicesMock);
  });
});
