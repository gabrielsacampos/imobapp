import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumCostumersSupliersMock } from '../../../test/3rdParty-repositories/granatum-repositories/costumers-supliers/granatum-costumers-supliers.mocks';
import { GranatumSupliersRepository } from './granatum-supliers.repository';

describe('GranatumSupliersService', () => {
  let repository: GranatumSupliersRepository;
  let costumersSupliersMock: GranatumCostumersSupliersMock;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    costumersSupliersMock = new GranatumCostumersSupliersMock();
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumSupliersRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = module.get<GranatumSupliersRepository>(GranatumSupliersRepository);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: costumersSupliersMock.allItems });
  });

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAll should return array of all accounts', async () => {
    const result = await repository.getAll();
    expect(result).toBe(costumersSupliersMock.allItems);
  });
});
