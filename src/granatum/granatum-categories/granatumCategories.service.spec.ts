import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumCategoriesService } from './granatumCategories.service';
import { categoriesMocks } from './granatumCategories.mocks';

describe('GranatumTransactionsService', () => {
  let granatumCategoriesService: GranatumCategoriesService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCategoriesService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    granatumCategoriesService = moduleRef.get<GranatumCategoriesService>(GranatumCategoriesService);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: categoriesMocks });
  });

  test('getAllTransactions', async () => {
    const result = await granatumCategoriesService.findIdByDescription('aluguel referente a abril', categoriesMocks);
    expect(result).toEqual(1846027);
  });
});
