import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsService } from './granatumTransactions.service';
import { JobSetGranatumIdsMock } from '../../../test/3rdParty-repositories/granatum-repositories/transactions/granatum-transactions.mocks';

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
    const result = granatumTransactionsService.templateTransaction(JobSetGranatumIdsMock);
    console.log(JSON.stringify(result, null, 2));
  });
});
