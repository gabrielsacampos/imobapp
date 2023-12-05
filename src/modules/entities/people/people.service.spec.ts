import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPeopleRepository } from '../../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
import { inMemoryPeopleRepositoryMock } from '../../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;
  let inMemoryPeopleRepository: InMemoryPeopleRepository;
  beforeEach(async () => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleService, { provide: PeopleRepository, useValue: inMemoryPeopleRepository }],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update person when it exists', async () => {
    const personTest: CreatePersonDTO = inMemoryPeopleRepositoryMock[0];
    personTest.email = 'NewEmail@gmail.com';
    const result = await service.upsert(personTest);
    const updatedPerson = inMemoryPeopleRepositoryMock.find((person) => {
      return person.id_imobzi === personTest.id_imobzi;
    });
    expect(result).toEqual(updatedPerson);
    expect(result.email).toBe('NewEmail@gmail.com');
  });

  it('upsert > should create person when it NOT exists', async () => {
    const personTest: CreatePersonDTO = inMemoryPeopleRepositoryMock[0];
    personTest.id = 9898;
    const result = await service.upsert(personTest);
    const updatedPerson = inMemoryPeopleRepositoryMock.find((person) => {
      return person.id_imobzi === personTest.id_imobzi;
    });
    expect(result).toEqual(updatedPerson);
    expect(result.id).toBe(9898);
  });
});
