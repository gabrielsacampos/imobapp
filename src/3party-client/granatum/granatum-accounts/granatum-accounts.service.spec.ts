import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsMock } from '../../../../test/3rdParty-repositories/granatum-repositories/accounts/granatumAccounts.mock';
import { GranatumAccountsRepository } from './granatum-accounts.repository';
import { GranatumAccountsService } from './granatum-accounts.service';

describe('GranatumAccountsService', () => {
  let service: GranatumAccountsService;
  let accountMock: GranatumAccountsMock;

  beforeEach(async () => {
    accountMock = new GranatumAccountsMock();
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumAccountsService, { provide: GranatumAccountsRepository, useValue: accountMock }],
    }).compile();

    service = module.get<GranatumAccountsService>(GranatumAccountsService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findIdByDescription should handle with regex to find the entity ID', async () => {
    const result1 = await service.findIdByDescription('PjBank');
    expect(result1).toBe(104193);
    const result2 = await service.findIdByDescription('Inter');
    expect(result2).toBe(103796);
  });
});
