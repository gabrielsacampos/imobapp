import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { GranatumTransactionPostDTO } from './granatumTransacationsPost.dtos';
import { GranatumTransactionsService } from './granatumTransactions.service';

const transactionDataMock: GranatumTransactionPostDTO = {
  descricao: 'teste',
  conta_id: 106274,
  categoria_id: 1937709,
  valor: 100,
  data_vencimento: '2023-01-01',
};

describe('GranatumTransactionsService', () => {
  let granatumTransactionsService: GranatumTransactionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsService],
    }).compile();
    granatumTransactionsService = moduleRef.get<GranatumTransactionsService>(GranatumTransactionsService);
  });

  test('getAllTransactions', async () => {
    // const result = await granatumTransactionsService.postTransaction(transactionDataMock);
    // console.log(result);
  });
});
