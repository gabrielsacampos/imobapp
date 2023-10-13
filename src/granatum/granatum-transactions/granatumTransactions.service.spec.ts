import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { setGranatumIdsIntoInvoicesMock } from '../granatum.service.mocks';
import { formatDataToPostTransactionMock } from './granatumTransactions.mocks';
import { GranatumTransactionsService } from './granatumTransactions.service';

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
    const result = granatumTransactionsService.formatDataToPostTransaction(setGranatumIdsIntoInvoicesMock);
    expect(result).toEqual(formatDataToPostTransactionMock);
  });
});
