import { Test, TestingModule } from '@nestjs/testing';
import { CreateBuildingDTO } from 'src/repository/buildings/dtos/create-building.dtos';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/buildings/imobziBuildings.mock';
import { ImobziBuildingsRepository } from './imobziBuildings.repository';
import { ImobziBuildingsService } from './imobziBuildings.service';

describe('ImobziBuildingService', () => {
  let service: ImobziBuildingsService;
  let buildingMock: ImobziBuildingsMock;

  beforeEach(async () => {
    buildingMock = new ImobziBuildingsMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsService, { provide: ImobziBuildingsRepository, useValue: buildingMock }],
    }).compile();

    service = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('getRequiredBuildingDataToDb should format response data to have db required properties', async () => {
    const result: CreateBuildingDTO[] = await service.getRequiredBuildingDataToDb();
    result.forEach((building: CreateBuildingDTO) => {
      for (const prop in building) {
        expect(building[prop]).toBeDefined();
      }
    });
  });
});
