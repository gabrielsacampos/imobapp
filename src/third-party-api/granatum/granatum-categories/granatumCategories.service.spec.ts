import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { GranatumCategoriesService } from './granatumCategories.service';

describe('GranatumTransactionsService', () => {
  let granatumCategoriesService: GranatumCategoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCategoriesService],
    }).compile();
    granatumCategoriesService = moduleRef.get<GranatumCategoriesService>(GranatumCategoriesService);
  });

  test('getAllTransactions', async () => {
    const result = await granatumCategoriesService.findIdByDescription('aluguel referente a abril');
    expect(result).toEqual(1846027);
  });
});
