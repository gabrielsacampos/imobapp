import { Test, TestingModule } from '@nestjs/testing';
import { inMemoryPeopleRepositoryMock } from '../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';
import { InMemoryPeopleRepository } from '../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
import { PeopleRepository } from './people.repository';
import { CreatePersonDTO } from './dtos/create-person.dtos';

describe('PeopleRepository', () => {
  let repository: PeopleRepository;
  let inMemoryPeopleRepository: InMemoryPeopleRepository;

  beforeEach(async () => {
    inMemoryPeopleRepository = new InMemoryPeopleRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: PeopleRepository, useValue: inMemoryPeopleRepository }],
    }).compile();

    repository = module.get<PeopleRepository>(PeopleRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll > should return array of people', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryPeopleRepositoryMock);
  });

  it('findUnique > existgin id_imobzi should return a person', async () => {
    const randomPersonToTest = inMemoryPeopleRepositoryMock[4];
    const randomPersonId = randomPersonToTest.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const person = inMemoryPeopleRepositoryMock.find((person) => person.id_imobzi === randomPersonId);
    expect(result).toBe(person);
  });

  it('findUnique > NOT exsting id_imobzi should NOT return a person', async () => {
    await expect(repository.findById('10')).rejects.toThrow();
  });

  it('findExistingCPF > existgin cpf should return a person', async () => {
    const randomPersonToTest = inMemoryPeopleRepositoryMock[4];
    const randomPersonCPF = randomPersonToTest.cpf;
    const person = inMemoryPeopleRepositoryMock.find((person) => person.cpf === randomPersonCPF);
    const result = await repository.findExistingCPF(randomPersonCPF);
    expect(result).toBe(person);
  });

  it('create > exsting id_imobzi || cpf should NOT create a person', async () => {
    const randomPersonToTest = inMemoryPeopleRepositoryMock[4];
    await expect(repository.create(randomPersonToTest)).rejects.toThrow();
  });

  it('create > should create and return the new person', async () => {
    const newPerson: CreatePersonDTO = {
      cpf: '001.001.000-21',
      email: 'fakeemail@gmail.com',
      fullname: 'My Fullname',
      id_imobzi: '11111111',
      phone: '81 8181818181',
    };

    await expect(repository.create(newPerson)).resolves.not.toThrow();
    expect(inMemoryPeopleRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newPerson)]));
  });

  it('update > create person or update if not exists', async () => {
    const randomPersonToTest = inMemoryPeopleRepositoryMock[4];
    const id_imobzi = randomPersonToTest.id_imobzi;
    randomPersonToTest.email = 'thaisnew@gmail.com';
    await expect(repository.update(id_imobzi, randomPersonToTest)).resolves.not.toThrow();
    expect(inMemoryPeopleRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomPersonToTest)]),
    );
  });
});
