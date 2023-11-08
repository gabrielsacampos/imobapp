import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsMock } from '../../../../test/3rdParty-repositories/granatum-repositories/accounts/granatumAccounts.mock';
import { GranatumAccountsRepository } from './granatum-accounts.repository';

describe('GranatumAccountsRepository', () => {
  let repository: GranatumAccountsRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let accountMock: GranatumAccountsMock;

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    accountMock = new GranatumAccountsMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        GranatumAccountsRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = module.get<GranatumAccountsRepository>(GranatumAccountsRepository);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: accountMock.allAcounts });
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAll should return array of all accounts', async () => {
    const result = await repository.getAll();
    expect(result).toEqual(accountMock.allAcounts);
  });
});
