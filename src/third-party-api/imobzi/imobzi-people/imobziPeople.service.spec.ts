import { Test, TestingModule } from '@nestjs/testing';
import { ImobziPeopleProvider } from './imobziPeople.providers';
import { ImobziPeopleService } from './imobziPeople.service';

const getPersonMainDataFromImobziMock = [''];

describe('ImobziPeopleService', () => {
  let imobziPeopleService: ImobziPeopleService;
  let imobziPeopleProviderMock: { getPersonMainDataFromImobzi: jest.Mock };

  beforeEach(async () => {
    imobziPeopleProviderMock = { getPersonMainDataFromImobzi: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziPeopleService,
        {
          provide: ImobziPeopleProvider,
          useValue: imobziPeopleProviderMock,
        },
      ],
    }).compile();

    imobziPeopleProviderMock.getPersonMainDataFromImobzi.mockResolvedValue(getPersonMainDataFromImobziMock);
    imobziPeopleService = moduleRef.get<ImobziPeopleService>(ImobziPeopleService);
  });

  test('getPersonDataToDb', async () => {
    const result = await imobziPeopleService.getPersonDataToDb(12345);
    expect(result).toBe(getPersonMainDataFromImobziMock);
  });
});
