import { Test, TestingModule } from '@nestjs/testing';
import { CreatePersonDTO } from 'src/repository/people/dtos/create-person.dtos';
import { SharedModule } from 'src/shared.module';
import { ImobziPeopleMock } from '../../../test/3rdParty-repositories/imobzi-repositories/people/imobziPeople.mocks';
import { ImobziPeopleRepository } from './imobziPeople.repository';
import { ImobziPeopleService } from './imobziPeople.service';

describe('ImobziPeopleRepository', () => {
  let service: ImobziPeopleService;
  let peopleMock: ImobziPeopleMock;

  beforeEach(async () => {
    peopleMock = new ImobziPeopleMock();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziPeopleService, { provide: ImobziPeopleRepository, useValue: peopleMock }],
    }).compile();

    service = moduleRef.get<ImobziPeopleService>(ImobziPeopleService);
  });

  test('getPersonDataToDb', async () => {
    const people = peopleMock.allPeopleFullData;
    const personTest = people[0];
    const result: CreatePersonDTO = await service.getRequiredData(personTest.db_id.toString());
    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });
});
