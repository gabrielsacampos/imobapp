import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsService } from './granatumTransactions.service';
import { JobSetGranatumIdsMock } from './granatumTransactions.mocks';

describe('GranatumTransactionsService', () => {
  let granatumTransactionsService: GranatumTransactionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsService],
    }).compile();
    granatumTransactionsService = moduleRef.get<GranatumTransactionsService>(GranatumTransactionsService);
  });

  test('formatDataToPostTransaction', async () => {
    const result = granatumTransactionsService.templateTransactions(JobSetGranatumIdsMock);
    console.log(JSON.stringify(result, null, 2));
  });
});
