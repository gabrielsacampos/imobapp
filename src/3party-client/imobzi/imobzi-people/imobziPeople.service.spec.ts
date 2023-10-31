import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { imobziPersonMock } from './imobziPeople.mocks';
import { ImobziPeopleService } from './imobziPeople.service';

describe('ImobziPeopleService', () => {
  let imobziPeopleService: ImobziPeopleService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziPeopleService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziPeopleService = moduleRef.get<ImobziPeopleService>(ImobziPeopleService);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === imobziPersonMock.db_id.toString()) {
        return Promise.resolve({ data: imobziPersonMock });
      } else {
        return Promise.reject(`id ${id} not found at organiations`);
      }
    });
  });

  test('getPersonDataToDb', async () => {
    const result = await imobziPeopleService.getRequiredPersonDataToDb('123412421234');
    expect(result).toEqual({
      id_imobzi: '123412421234',
      cpf: '002.002.000-00',
      phone: '00 00000-000000',
      fullname: 'john doe sauro',
      email: 'john@example.com',
      code_imobzi: '23',
      marital_status: 'single',
      gender: 'Male',
      profession: 'Developer',
    });
  });
});
