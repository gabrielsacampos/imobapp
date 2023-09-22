import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

import { PersonDTO } from './imobziPeople.dtos';
import { ImobziPeopleProvider } from './imobziPeople.providers';

const personMock: Partial<PersonDTO> = {
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

describe('ImobziPeopleProvider', () => {
  let imobziPeopleProvider: ImobziPeopleProvider;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        ImobziPeopleProvider,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziPeopleProvider = moduleRef.get<ImobziPeopleProvider>(ImobziPeopleProvider);
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === personMock.db_id.toString()) {
        return Promise.resolve({ data: personMock });
      } else {
        return Promise.reject({ message: `id ${id} not found on person` });
      }
    });
  });

  test('getPersonMainDataFromImobzi', async () => {
    const result = await imobziPeopleProvider.getPersonMainDataFromImobzi(personMock.db_id);
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
