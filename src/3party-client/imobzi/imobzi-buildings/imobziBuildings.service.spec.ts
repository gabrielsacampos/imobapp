import { Test, TestingModule } from '@nestjs/testing';
import { CreateBuildingDTO } from 'src/repository/buildings/dtos/create-building.dtos';
import { SharedModule } from 'src/shared.module';
import { anImobziBuildings } from '../../../../test/3rdParty-repositories/imobzi-repositories/buildings/imobziBuildings.mock';
import { ImobziBuildingsRepository } from './imobziBuildings.repository';
import { ImobziBuildingsService } from './imobziBuildings.service';

describe('ImobziBuildingService', () => {
  let service: ImobziBuildingsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziBuildingsService, ImobziBuildingsRepository],
    }).compile();

    service = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('getRequiredBuildingDataToDb should format response data to have db required properties', () => {
    const result: CreateBuildingDTO = service.getRequiredBuildingDataToDb(anImobziBuildings[0]);
    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });
});
