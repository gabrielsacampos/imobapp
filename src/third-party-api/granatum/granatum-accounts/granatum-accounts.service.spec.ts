import { Test, TestingModule } from '@nestjs/testing';
import { isArray } from 'class-validator';
import { SharedModule } from 'src/third-party-api/shared.module';
import { GranatumAccountsService } from './granatum-accounts.service';
import { accountsMocks } from './granatum-accounts.mocks';
import { HttpService } from '@nestjs/axios';

describe('GranatumAccountsService', () => {
  let granatumAccountsService: GranatumAccountsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumAccountsService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    granatumAccountsService = module.get<GranatumAccountsService>(GranatumAccountsService);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: accountsMocks });
  });

  test('should be defined', () => {
    expect(granatumAccountsService).toBeDefined();
  });

  test('gtAllContacts', async () => {
    const result = await granatumAccountsService.getAllAccounts();
    expect(result).toBeDefined();
    expect(isArray(result)).toBe(true);
  });

  test('findIdByDescription', async () => {
    const result1 = await granatumAccountsService.findIdByDescription('PjBank');
    expect(result1).toBe(104193);
    const result2 = await granatumAccountsService.findIdByDescription('Inter');
    expect(result2).toBe(103796);
  });
});
