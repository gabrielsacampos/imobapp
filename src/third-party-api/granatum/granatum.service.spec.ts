import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared.module';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumService } from './granatum.service';

describe('GranatumTransactionsService', () => {
  let granatumService: GranatumService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumService, GranatumCategoriesService, GranatumTransactionsService],
    }).compile();
    granatumService = moduleRef.get<GranatumService>(GranatumService);
  });

  test('getAllTransactions', async () => {
    const result = await granatumService.setItemsGranatumCategoriesId([
      { description: 'aluguel' },
      { description: 'iptu' },
    ]);
    expect(result).toEqual([
      { description: 'aluguel', id_category_granatum: 1846027 },
      { description: 'iptu', id_category_granatum: 1843892 },
    ]);
  });
});
