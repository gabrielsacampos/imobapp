import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziBuildingsService } from './imobziBuildings.service';

const buildingsMock = {
  page1: { cursor: 'abc', properties: [{ db_id: 111111 }, { db_id: 2222222 }] },
  page2: { cursor: null, properties: [{ db_id: 333333 }, { db_id: 4444444 }] },
};

describe('ImobziBuildingService', () => {
  let imobziBuildingsService: ImobziBuildingsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    imobziBuildingsService = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      switch (url) {
        case 'https://api.imobzi.app/v1/properties?smart_list=buildings&cursor=':
          return Promise.resolve({ data: buildingsMock.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=buildings&cursor=abc':
          return Promise.resolve({ data: buildingsMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllBuildings', async () => {
    const result = await imobziBuildingsService.getAllBuildings();
    expect(result).toEqual([...buildingsMock.page1.properties, ...buildingsMock.page2.properties]);
  });
});
