import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryLeasesRepository } from '../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository';
import { inMemoryLeasesRepositoryMock } from '../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository.mock';
import { LeaseItemsModule } from '../lease-items/lease-items.module';
<<<<<<< Updated upstream
=======
import { LeaseItemsService } from '../lease-items/lease-items.service';
>>>>>>> Stashed changes
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { LeasesRepository } from './leases.repository';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
  let service: LeasesService;
  let inMemoryLeasesRepository: InMemoryLeasesRepository;
  let leaseItemsServiceMock: { catchUpdates: jest.Mock };
  beforeEach(async () => {
    leaseItemsServiceMock = { catchUpdates: jest.fn() };
    inMemoryLeasesRepository = new InMemoryLeasesRepository();

    const module: TestingModule = await Test.createTestingModule({
      imports: [LeaseItemsModule],
<<<<<<< Updated upstream
      providers: [LeasesService, { provide: LeasesRepository, useValue: inMemoryLeasesRepository }],
=======
      providers: [
        LeasesService,
        { provide: LeaseItemsService, useValue: leaseItemsServiceMock },
        {
          provide: LeasesRepository,
          useValue: inMemoryLeasesRepository,
        },
      ],
>>>>>>> Stashed changes
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update Lease when it exists', async () => {
    const LeaseTest: CreateLeaseDTO = { ...inMemoryLeasesRepositoryMock[0] };
    LeaseTest.status = 'too old';
    const result = await service.upsert(LeaseTest);
    const updatedLease = inMemoryLeasesRepositoryMock.find((Lease) => {
      return Lease.id_imobzi === LeaseTest.id_imobzi;
    });
    expect(result).toEqual(updatedLease);
    expect(result.status).toBe('too old');
  });

  it('upsert > should update ONLY NEW LEASE ITEMS', async () => {
    const newItems = [
      {
        behavior: '',
        due_date: new Date('2023-01-01'),
        description: 'something',
        include_in_dimob: true,
        management_fee: false,
        recurrent: true,
        repeat_index: 1,
        until_due_date: true,
        value: 100,
      },
    ];

    leaseItemsServiceMock.catchUpdates.mockResolvedValue(newItems);

    const leaseNotUpdated: CreateLeaseDTO = { ...inMemoryLeasesRepositoryMock[0] };
    const leaseUpdate: CreateLeaseDTO = { ...leaseNotUpdated.leaseItems, ...newItems };

    const result = await service.upsert(leaseUpdate);

    console.log(inMemoryLeasesRepository[0].leaseItems);
    expect(result).toStrictEqual(inMemoryLeasesRepository[0].leaseItems, ...newItems);
  });

  it('upsert > should create Lease when it NOT exists', async () => {
    const LeaseTest: CreateLeaseDTO = { ...inMemoryLeasesRepositoryMock[0] };
    LeaseTest.id = 9898;
    const result = await service.upsert(LeaseTest);
    const updatedLease = inMemoryLeasesRepositoryMock.find((Lease) => {
      return Lease.id_imobzi === LeaseTest.id_imobzi;
    });
    expect(result).toEqual(updatedLease);
    expect(result.id).toBe(9898);
  });
});
