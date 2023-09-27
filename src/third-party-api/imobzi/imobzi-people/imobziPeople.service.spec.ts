import { Test, TestingModule } from '@nestjs/testing';
import { ImobziPersonDTO } from './imobziPeople.dtos';
import { ImobziPeopleProvider } from './imobziPeople.providers';
import { ImobziPeopleService } from './imobziPeople.service';

const personFullDataFromImobziMock: Partial<ImobziPersonDTO> = {
  db_id: 123412421234,
  fullname: 'john doe sauro',
  email: 'john@example.com',
  code: '23',
  fields: {
    group_personal: [
      [],
      [],
      [],
      [],
      [{ field_id: 'marital_status', value: 'single' }],
      [],
      [{ field_id: 'profession', value: 'Developer' }],
      [{ field_id: 'gender', value: 'Male' }],
    ],
  },
};

describe('ImobziPeopleService', () => {
  let imobziPeopleService: ImobziPeopleService;
  let imobziPeopleProviderMock: { getPersonFullDataFromImobzi: jest.Mock };

  beforeEach(async () => {
    imobziPeopleProviderMock = { getPersonFullDataFromImobzi: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziPeopleService,
        {
          provide: ImobziPeopleProvider,
          useValue: imobziPeopleProviderMock,
        },
      ],
    }).compile();

    imobziPeopleProviderMock.getPersonFullDataFromImobzi.mockResolvedValue(personFullDataFromImobziMock);
    imobziPeopleService = moduleRef.get<ImobziPeopleService>(ImobziPeopleService);
  });

  test('getPersonDataToDb', async () => {
    const result = await imobziPeopleService.formatPersonDataToDb(12345);
    expect(result).toEqual({
      id_imobzi: '123412421234',
      fullname: 'john doe sauro',
      email: 'john@example.com',
      code_imobzi: '23',
      maritalStatus: 'single',
      gender: 'Male',
      profession: 'Developer',
    });
  });
});
