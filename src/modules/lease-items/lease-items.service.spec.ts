import { Test, TestingModule } from '@nestjs/testing';
import {
  InMemoryLeasesItemsRepository,
  leaseItemsMock,
} from 'src/test/server-repositories/inMemoryLeaseItemsRepository/inMemoryLeaseItemsRepository';
import { CreateLeaseItemsDTO } from './dtos/create-leaseItems.dtos';
import { LeaseItemsRepository } from './lease-items.repository';
import { LeaseItemsService } from './lease-items.service';

describe('LeaseItemsService', () => {
  let service: LeaseItemsService;
  let repositoryMock: InMemoryLeasesItemsRepository;

  beforeEach(async () => {
    repositoryMock = new InMemoryLeasesItemsRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaseItemsService, { provide: LeaseItemsRepository, useValue: repositoryMock }],
    }).compile();

    service = module.get<LeaseItemsService>(LeaseItemsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('catchUpdates should NOT return items from imobzi if it is already on DB', async () => {
    const itensInputWithDataOnDb: CreateLeaseItemsDTO[] = leaseItemsMock;

    const result = await service.catchUpdates(itensInputWithDataOnDb);
    expect(result).toBeUndefined();
  });

  it('catchUpdates should return items from imobzi if it is NOT already on DB', async () => {
    const itensInputWithDataOnDb: CreateLeaseItemsDTO[] = leaseItemsMock;
    const newItem = { ...itensInputWithDataOnDb[0] };
    newItem.description = 'new item';

    const itensWithSomeIndexesNotOnDb = [...itensInputWithDataOnDb, newItem];
    const result = await service.catchUpdates(itensWithSomeIndexesNotOnDb);
    console.log(result);
    expect(result).toEqual([newItem]);
  });
});
