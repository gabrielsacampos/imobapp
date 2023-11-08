import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumCostumersSupliersMock } from '../../../../test/3rdParty-repositories/granatum-repositories/costumers-supliers/granatum-costumers-supliers.mocks';
import { GranatumCostumersRepository } from './granatum-costumers.repository';

describe('GranatumClientsService', () => {
  let repository: GranatumCostumersRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let costumersSupliersMock: GranatumCostumersSupliersMock;

  beforeEach(async () => {
    costumersSupliersMock = new GranatumCostumersSupliersMock();
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCostumersRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = module.get<GranatumCostumersRepository>(GranatumCostumersRepository);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: costumersSupliersMock.allItems });
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAll should return array of all accounts', async () => {
    const result = await repository.getAll();
    expect(result).toBe(costumersSupliersMock.allItems);
  });
});
