import { Test, TestingModule } from '@nestjs/testing';
import { getItemsPaidMock } from 'src/repository/modules/invoices/mocks/invoices.queries.mocks';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumModule } from './granatum.module';
import { GranatumQueueJobs } from './granatum.queue.jobs';

describe('GranatumQueueJobs', () => {
  let granatumQueueJobs: GranatumQueueJobs;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, GranatumModule],
      providers: [
        GranatumAccountsService,
        GranatumCategoriesService,
        GranatumCostCenterService,
        GranatumTransactionsService,
      ],
    }).compile();

    granatumQueueJobs = moduleRef.get<GranatumQueueJobs>(GranatumQueueJobs);
  });

  test('should be defined', () => {
    expect(granatumQueueJobs).toBeDefined();
  });
  test('', async () => {
    const arrayOfItems = await granatumQueueJobs.setGanatumIds(getItemsPaidMock);

    const allValues = arrayOfItems.map((item) => {
      return Object.values(item);
    });

    const allValuesAreDefined = allValues.every((value) => value !== undefined);
    expect(allValuesAreDefined).toBe(true);
  });
});
