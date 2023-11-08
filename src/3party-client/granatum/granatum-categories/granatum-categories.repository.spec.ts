import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumCategoriesMock } from '../../../test/3rdParty-repositories/granatum-repositories/categories/granatumCategories.mocks';
import { GranatumCategoriesRepository } from './granatum-categories.repository';

describe('GranatumTransactionsService', () => {
  let repository: GranatumCategoriesRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let categoriesMock: GranatumCategoriesMock;

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    categoriesMock = new GranatumCategoriesMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCategoriesRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = moduleRef.get<GranatumCategoriesRepository>(GranatumCategoriesRepository);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: categoriesMock.allItems });
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });
  test('gtAll should return array of all accounts', async () => {
    const result = await repository.getAll();
    expect(result).toEqual(categoriesMock.allItems);
  });
});
