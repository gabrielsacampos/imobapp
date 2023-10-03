import { Test, TestingModule } from '@nestjs/testing';
import { ImobziBuildingsService } from './imobziBuildings.service';
import { propertyFromImobziMock } from '../imobzi-properties/imobziProperties.mocks';

describe('ImobziBuildingService', () => {
  let imobziBuildingsService: ImobziBuildingsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ImobziBuildingsService],
    }).compile();
    imobziBuildingsService = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('getRequiredBuildingDataToDb', () => {
    const result = imobziBuildingsService.getRequiredBuildingDataToDb([propertyFromImobziMock]);
    expect(result).toEqual([
      {
        id_imobzi: '99999999999',
        address: 'Great Palace, 324',
        city: 'São Paulo',
        name: 'Eko Home Club',
        zipcode: '55016-400',
      },
    ]);
  });
});
