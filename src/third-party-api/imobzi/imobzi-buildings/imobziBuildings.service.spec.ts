import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziBuildingsService } from './imobziBuildings.service';

const buildingsMock = {
  page1: { cursor: 'abc', properties: [{ db_id: 12345 }, { db_id: 12345 }] },
};

describe('ImobziBuildingService', () => {
  let imobziBuildingsService: ImobziBuildingsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsService, { provide: HttpService, useValue: { httpServiceMock } }],
    }).compile();

    httpServiceMock.axiosRef.get.mockResolvedValue(buildingsMock);
    imobziBuildingsService = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('getRequiredBuildingDataToDb', async () => {
    const result = await imobziBuildingsService.getAllBuildings();
    console.log(result);
  });
});
