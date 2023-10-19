import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesModule } from 'src/repository/modules/invoices/invoices.module';
import { InvoicesService } from 'src/repository/modules/invoices/invoices.service';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumModule } from './granatum.module';
import { GranatumQueueConsumer } from './granatum.queue.consumer';
import { GranatumQueueProducer } from './granatum.queue.producer';

const invoicesMock = {
  data: {
    count_invoices: 2,
    sum_interest_value: 12,
    paid_at: '2023-01-01',
    credit_at: '2023-01-01',
    account_credit: 'Inter',
    bank_fee_value: 6.4,
    description: 'Cobranças Imobzi',
    items: [
      {
        id_invoice: 'cde3456',
        description: 'Iptu',
        value: 200,
        block: 'Figueiras',
        building: 'Eko Home Club',
      },
      {
        id_invoice: 'fgt145',
        description: 'Aluguel',
        value: 800,
        property_unity: '123',
        block: 'Ipê',
        building: 'Eko Home Club',
      },
      {
        id_invoice: 'fgt145',
        description: 'Iptu',
        value: 200,
        property_unity: '123',
        block: 'Ipê',
        building: 'Eko Home Club',
      },
    ],
  },
};



describe('GranatumQueueConsumer', () => {
  let granatumQueueConsumer: GranatumQueueConsumer;
  let granatumAccountsServiceMock: { findIdByDescription: jest.Mock };
  let granatumCategoriesServiceMock: { findIdByDescription: jest.Mock };
  let granatumCostCenterServiceMock: { findIdByDescription: jest.Mock };

  beforeEach(async () => {
    granatumAccountsServiceMock = {
      findIdByDescription: jest.fn(),
    };
    granatumCategoriesServiceMock = {
      findIdByDescription: jest.fn(),
    };
    granatumCostCenterServiceMock = {
      findIdByDescription: jest.fn(),
    };

    const granatumModule: TestingModule = await Test.createTestingModule({
      imports: [
        InvoicesModule,
        SharedModule,
        GranatumModule,
        BullModule.forRoot({
          url: process.env.redis_url,
        }),
        BullModule.registerQueue({
          name: 'GranatumQueue',
        }),
      ],
      providers: [
        InvoicesService,
        GranatumTransactionsService,
        GranatumQueueProducer,
        GranatumQueueConsumer,
        GranatumModule,
        { provide: GranatumAccountsService, useValue: granatumAccountsServiceMock },
        { provide: GranatumCategoriesService, useValue: granatumCategoriesServiceMock },
        { provide: GranatumCostCenterService, useValue: granatumCostCenterServiceMock },
      ],
    }).compile();

    granatumQueueConsumer = granatumModule.get<GranatumQueueConsumer>(GranatumQueueConsumer);

    granatumAccountsServiceMock.findIdByDescription.mockResolvedValue(11111);
    granatumCategoriesServiceMock.findIdByDescription.mockResolvedValue(2222222);
    granatumCostCenterServiceMock.findIdByDescription.mockResolvedValue(333333);
  });

  test('should be defined', () => {
    expect(granatumQueueConsumer).toBeDefined();
  });

  test('', async () => {
    await granatumQueueConsumer.setGanatumIds(invoicesMock);
  });
});
