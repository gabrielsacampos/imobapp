import { Test, TestingModule } from '@nestjs/testing';
import { CreateBuildingDTO } from 'src/modules/entities/buildings/dtos/create-building.dtos';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsMock } from '../../../test/3rdParty-repositories/imobzi-repositories/buildings/imobziBuildings.mock';
import { ImobziBuildingsService } from './imobzi-buildings.service';

describe('ImobziBuildingService', () => {
  let service: ImobziBuildingsService;
  let buildingMock: ImobziBuildingsMock;

  beforeEach(async () => {
    buildingMock = new ImobziBuildingsMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsService],
    }).compile();

    service = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('getRequiredBuildingDataToDb should format response data to have db required properties', async () => {
    const buildings = buildingMock.allBuildings;
    const buildingTest = buildings[0];
    const result: CreateBuildingDTO = service.getRequiredData(buildingTest);

    for (const prop in result) {
      expect(result[prop]).toBeDefined();
    }
  });
});
