import { Test, TestingModule } from '@nestjs/testing';
import { ImobziController } from '../imobzi.controllers';
import { ImobziModule } from '../imobzi.module';

import { ImobziBuildingsService } from './imobziBuildings.service';

describe('ImobziBuildingService', () => {
  let imobziBuildingsService: ImobziBuildingsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ImobziModule],
      controllers: [ImobziController],
      providers: [ImobziBuildingsService],
    }).compile();

    imobziBuildingsService = moduleRef.get<ImobziBuildingsService>(ImobziBuildingsService);
  });

  test('getRequiredBuildingDataToDb', async () => {
    const result = await imobziBuildingsService.getAllBuildings();
    console.log(result);
    // expect(result).toEqual([
    //   {
    //     id_imobzi: '99999999999',
    //     address: 'Great Palace, 324',
    //     city: 'São Paulo',
    //     name: 'Eko Home Club',
    //     zipcode: '55016-400',
    //   },
    // ]);
  });
});
