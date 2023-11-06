import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { imobziBuildingsPagination } from '../../../../test/3rdParty-repositories/imobzi-repositories/buildings/imobziBuildings.mock';
import { ImobziBuildingsRepository } from './imobziBuildings.repository';

describe('ImobziBuildingRepository', () => {
  let repository: ImobziBuildingsRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = moduleRef.get<ImobziBuildingsRepository>(ImobziBuildingsRepository);
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAllBuildings should get array of buildings pagination', async () => {
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      switch (url) {
        case 'https://api.imobzi.app/v1/properties?smart_list=buildings&cursor=':
          return Promise.resolve({ data: imobziBuildingsPagination.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=buildings&cursor=abc':
          return Promise.resolve({ data: imobziBuildingsPagination.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
    const result = await repository.getAllBuildings();
    expect(result).toEqual([
      ...imobziBuildingsPagination.page1.properties,
      ...imobziBuildingsPagination.page2.properties,
    ]);
  });
});
