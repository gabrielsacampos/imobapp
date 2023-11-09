import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsRepository } from './granatum-transactions.repository';

describe('GranatumTransactionsRepository', () => {
  let repository: GranatumTransactionsRepository;
  let httpServiceMock: { axiosRef: { post: jest.Mock } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsRepository, { provide: PrismaService, useValue: httpServiceMock }],
    }).compile();

    repository = module.get<GranatumTransactionsRepository>(GranatumTransactionsRepository);
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });
});
