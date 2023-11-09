import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryOrganizationsRepository } from '../../test/server-repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository';
import { inMemoryOrganizationsRepositoryMock } from '../../test/server-repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository.mock';
import { OrganizationsRepository } from './organizations.repository';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsRepository', () => {
  let repository: OrganizationsRepository;
  let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;

  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: OrganizationsRepository, useValue: inMemoryOrganizationsRepository },
      ],
    }).compile();

    repository = module.get<OrganizationsRepository>(OrganizationsRepository);
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll > should return array of organizations', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryOrganizationsRepositoryMock);
  });

  it('findUnique > existing id_imobzi should return a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    const randomPersonId = randomPersonToTest.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const organization = inMemoryOrganizationsRepositoryMock.find(
      (organization) => organization.id_imobzi === randomPersonId,
    );
    expect(result).toBe(organization);
  });

  it('findUnique > NOT existing id_imobzi should NOT return a organization', async () => {
    await expect(repository.findById('10')).rejects.toThrow();
  });

  it('findExistingCNPJ > existing cpf should return a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    const randomPersonCPF = randomPersonToTest.cnpj;
    const organization = inMemoryOrganizationsRepositoryMock.find(
      (organization) => organization.cnpj === randomPersonCPF,
    );
    const result = await repository.findExistingCNPJ(randomPersonCPF);
    expect(result).toBe(organization);
  });

  it('create > should create and return the new organization', async () => {
    const newPerson: CreateOrganizationDTO = {
      id_imobzi: '000000000000',
      name: 'some name',
      id_person_representative: '1231234',
      cnpj: '12.000.222.00-00',
      representative_type: '',
      phone: '',
      email: '',
    };

    await expect(repository.create(newPerson)).resolves.not.toThrow();
    expect(inMemoryOrganizationsRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newPerson)]));
  });

  it('create > existing id_imobzi || cpf should NOT create a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    await expect(repository.create(randomPersonToTest)).rejects.toThrow();
  });

  it('update > should update existing organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    const id_imobzi = randomPersonToTest.id_imobzi;
    randomPersonToTest.email = 'thaisnew@gmail.com';
    await expect(repository.update(id_imobzi, randomPersonToTest)).resolves.not.toThrow();
    expect(inMemoryOrganizationsRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomPersonToTest)]),
    );
  });

  it('update > should NOT update NOT existing organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    randomPersonToTest.email = 'thaisnew@gmail.com';
    const id_imobzi = 'not_existing';
    await expect(repository.update(id_imobzi, randomPersonToTest)).rejects.toThrow();
    expect(inMemoryOrganizationsRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomPersonToTest)]),
    );
  });
});
