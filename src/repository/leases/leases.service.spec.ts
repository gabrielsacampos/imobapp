import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryLeasesRepository } from '../../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository';
import { inMemoryLeasesRepositoryMock } from '../../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository.mock';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { LeasesRepository } from './leases.repository';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
  let service: LeasesService;
  let inMemoryLeasesRepository: InMemoryLeasesRepository;
  beforeEach(async () => {
    inMemoryLeasesRepository = new InMemoryLeasesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasesService, { provide: LeasesRepository, useValue: inMemoryLeasesRepository }],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update Lease when it exists', async () => {
    const spyUpdate = jest.spyOn(inMemoryLeasesRepository, 'update');

    const LeaseTest: CreateLeaseDTO = inMemoryLeasesRepositoryMock[0];
    LeaseTest.status = 'too old';
    const result = await service.upsert(LeaseTest);
    const updatedLease = inMemoryLeasesRepositoryMock.find((Lease) => {
      return Lease.id_imobzi === LeaseTest.id_imobzi;
    });
    expect(result).toEqual(updatedLease);
    expect(result.status).toBe('too old');
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('upsert > should create Lease when it NOT exists', async () => {
    const spyCreate = jest.spyOn(inMemoryLeasesRepository, 'update');
    const LeaseTest: CreateLeaseDTO = inMemoryLeasesRepositoryMock[0];
    LeaseTest.id = 9898;
    const result = await service.upsert(LeaseTest);
    const updatedLease = inMemoryLeasesRepositoryMock.find((Lease) => {
      return Lease.id_imobzi === LeaseTest.id_imobzi;
    });
    expect(result).toEqual(updatedLease);
    expect(result.id).toBe(9898);
    expect(spyCreate).toHaveBeenCalled();
  });
});
