import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsRepository } from './granatum-transactions.repository';
import { GranatumTransactionsService } from './granatumTransactions.service';

describe('GranatumTransactionsRepository', () => {
  let repository: GranatumTransactionsRepository;
  let httpServiceMock: { axiosRef: { post: jest.Mock } };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();
    repository = moduleRef.get<GranatumTransactionsRepository>(GranatumTransactionsRepository);
  });
});
