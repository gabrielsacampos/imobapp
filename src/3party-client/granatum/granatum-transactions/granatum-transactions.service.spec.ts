import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import {
  granatumPostToFailMock,
  GranatumTransactionsMock,
} from 'src/test/3rdParty-repositories/granatum-repositories/transactions/granatum-transactions.mock';
import { GranatumTransactionsRepository } from './granatum-transactions.repository';
import { GranatumTransactionsService } from './granatum-transactions.service';

describe('GranatumTransactionsService', () => {
  let service: GranatumTransactionsService;
  let transactionsMock: GranatumTransactionsMock;

  beforeEach(async () => {
    transactionsMock = new GranatumTransactionsMock();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsService, { provide: GranatumTransactionsRepository, useValue: transactionsMock }],
    }).compile();
    service = moduleRef.get<GranatumTransactionsService>(GranatumTransactionsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('post throw error if post do not follow the format', () => {
    expect(service.postTransactions(granatumPostToFailMock)).rejects.toThrow();
  });
});
