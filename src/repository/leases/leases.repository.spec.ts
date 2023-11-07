import { Test, TestingModule } from '@nestjs/testing';
import { inMemoryLeasesRepositoryMock } from '../../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository.mock';
import { InMemoryLeasesRepository } from '../../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { LeasesRepository } from './leases.repository';

describe('LeasesRepository', () => {
  let repository: LeasesRepository;
  let inMemoryLeasesRepository: InMemoryLeasesRepository;

  beforeEach(async () => {
    inMemoryLeasesRepository = new InMemoryLeasesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: LeasesRepository, useValue: inMemoryLeasesRepository }],
    }).compile();

    repository = module.get<LeasesRepository>(LeasesRepository);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('findAll > should return array of leases', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryLeasesRepositoryMock);
  });

  it('findUnique > existing id_imobzi should return a lease', async () => {
    const randomLeaseToTest = inMemoryLeasesRepositoryMock[4];
    const randomPersonId = randomLeaseToTest.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const lease = inMemoryLeasesRepositoryMock.find((lease) => lease.id_imobzi === randomPersonId);
    expect(result).toBe(lease);
  });

  it('findUnique > NOT existing id_imobzi should NOT return a lease', async () => {
    await expect(repository.findById('10')).rejects.toThrow();
  });

  it('create > existing id_imobzi || cpf should NOT create a lease', async () => {
    const randomLeaseToTest = inMemoryLeasesRepositoryMock[4];
    const beneficiaries = [];
    const lease_items = [];

    await expect(repository.create({ ...randomLeaseToTest, beneficiaries, lease_items })).rejects.toThrow();
  });

  it('create > should create and return the new lease', async () => {
    const newLease: CreateLeaseDTO = {
      id_imobzi: '',
      duration: 0,
      fee: 0,
      guarantee_type: '',
      include_in_dimob: false,
      indeterminate: false,
      irrf: false,
      lease_value: 0,
      id_property_imobzi: '',
      start_at: undefined,
      status: '',
      id_annual_readjustment_imobzi: '',
      code_imobzi: '',
      guarantee_value: 0,
      beneficiaries: [],
      lease_items: [],
    };

    await expect(repository.create(newLease)).resolves.not.toThrow();
    expect(inMemoryLeasesRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newLease)]));
  });

  it('update > create lease or update if not exists', async () => {
    const randomLeaseToTest = inMemoryLeasesRepositoryMock[4];
    randomLeaseToTest.code_imobzi = 'xxx';
    const id_imobzi = randomLeaseToTest.id_imobzi;

    await expect(repository.update(id_imobzi, randomLeaseToTest)).resolves.not.toThrow();
    expect(inMemoryLeasesRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomLeaseToTest)]),
    );
  });
});
