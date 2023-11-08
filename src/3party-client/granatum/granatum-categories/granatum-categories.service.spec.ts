import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumCategoriesMock } from '../../../test/3rdParty-repositories/granatum-repositories/categories/granatumCategories.mocks';
import { GranatumCategoriesRepository } from './granatum-categories.repository';
import { GranatumCategoriesService } from './granatum-categories.service';

describe('GranatumTransactionsService', () => {
  let service: GranatumCategoriesService;
  let categoriesMock: GranatumCategoriesMock;

  beforeEach(async () => {
    categoriesMock = new GranatumCategoriesMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCategoriesService, { provide: GranatumCategoriesRepository, useValue: categoriesMock }],
    }).compile();

    service = moduleRef.get<GranatumCategoriesService>(GranatumCategoriesService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('filterSlip returns only categories from slips', async () => {
    const result = await service.filterSlip();
    expect(result.descricao).toBe('Recebimentos por Boleto');
  });

  test('findIdByDescription should handle with regex to find the entity ID', async () => {
    const result = await service.findIdByDescription('aluguel referente a abril');
    expect(result).toEqual(1846027);
  });
});
