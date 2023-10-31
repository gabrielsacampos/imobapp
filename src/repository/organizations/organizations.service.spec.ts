import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryOrganizationsRepository } from '../../../test/repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository';
import { inMemoryOrganizationsRepositoryMock } from '../../../test/repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository.mock';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;

  // ignore error from others methods to do not break test
  const skipeNoNeededErrors = () => {
    const spyFindById = jest.spyOn(inMemoryOrganizationsRepository, 'findById');
    spyFindById.mockReturnValue(false as any);
    const spyFindExistingCNPJ = jest.spyOn(inMemoryOrganizationsRepository, 'findExistingCNPJ');
    spyFindExistingCNPJ.mockReturnValue(false as any);
  };
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: OrganizationsRepository, useValue: inMemoryOrganizationsRepository },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll > should return array of organizations', async () => {
    const result = await service.findAll();
    expect(result).toBe(inMemoryOrganizationsRepositoryMock);
  });

  it('findUnique > existgin id_imobzi should return a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    const randomPersonId = randomPersonToTest.id_imobzi;
    const result = await service.findById(randomPersonId);
    const organization = inMemoryOrganizationsRepositoryMock.find(
      (organization) => organization.id_imobzi === randomPersonId,
    );
    expect(result).toBe(organization);
  });

  it('findUnique > NOT exsting id_imobzi should NOT return a organization', async () => {
    await expect(service.findById('10')).rejects.toThrow();
  });

  it('findExistingCNPJ > existgin cpf should return a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    const randomPersonCPF = randomPersonToTest.cnpj;
    const organization = inMemoryOrganizationsRepositoryMock.find(
      (organization) => organization.cnpj === randomPersonCPF,
    );
    const result = await service.findExistingCNPJ(randomPersonCPF);
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

    skipeNoNeededErrors();
    await expect(service.create(newPerson)).resolves.not.toThrow();
    expect(inMemoryOrganizationsRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newPerson)]));
  });

  it('create > exsting id_imobzi || cpf should NOT create a organization', async () => {
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    await expect(service.create(randomPersonToTest)).rejects.toThrow();
  });

  it('upsert > create organization or update if not exists', async () => {
    skipeNoNeededErrors();
    const randomPersonToTest = inMemoryOrganizationsRepositoryMock[4];
    randomPersonToTest.email = 'thaisnew@gmail.com';
    await expect(service.upsert(randomPersonToTest)).resolves.not.toThrow();
    expect(inMemoryOrganizationsRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomPersonToTest)]),
    );
  });
});
