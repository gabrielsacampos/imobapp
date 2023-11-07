import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { ImobziPeopleMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/people/imobziPeople.mocks';
import { ImobziPeopleRepository } from './imobziPeople.repository';

describe('ImobziPeopleRepository', () => {
  let repository: ImobziPeopleRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let peopleMock: ImobziPeopleMock;

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    peopleMock = new ImobziPeopleMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziPeopleRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = moduleRef.get<ImobziPeopleRepository>(ImobziPeopleRepository);
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getPersonFullData returns full data from a person at imobzi API', async () => {
    const people = peopleMock.allPeopleFullData;
    const personTest = people[0];
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === personTest.db_id.toString()) {
        return Promise.resolve({ data: personTest });
      } else {
        return Promise.reject(`id ${id} not found at organiations`);
      }
    });
    const result = await repository.getPersonFullData('123412421234');
    expect(result).toEqual(personTest);
  });
});
