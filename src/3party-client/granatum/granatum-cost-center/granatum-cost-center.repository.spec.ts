import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumCategoriesMock } from '../../../test/3rdParty-repositories/granatum-repositories/categories/granatumCategories.mocks';
import { GranatumCostCenterRepository } from './granatum-cost-center.repository';

describe('GranatumTransactionsService', () => {
  let repository: GranatumCostCenterRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let costCentersMock: GranatumCategoriesMock;

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    costCentersMock = new GranatumCategoriesMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCostCenterRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = moduleRef.get<GranatumCostCenterRepository>(GranatumCostCenterRepository);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: costCentersMock.allItems });
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });
  test('getAll should return array of all accounts', async () => {
    const result = await repository.getAll();
    expect(result).toEqual(costCentersMock.allItems);
  });
});
