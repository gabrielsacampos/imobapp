import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryLeasesItemsRepository } from '../../../test/server-repositories/inMemoryLeaseItemsRepository/inMemoryLeaseItemsRepository';
import { LeaseItemsRepository } from './lease-items.repository';

describe('LeaseItems', () => {
  let repository: LeaseItemsRepository;
  let inMemoryLeaseItemsRepository: InMemoryLeasesItemsRepository;

  beforeEach(async () => {
    inMemoryLeaseItemsRepository = new InMemoryLeasesItemsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LeaseItemsRepository,
          useValue: inMemoryLeaseItemsRepository,
        },
      ],
    }).compile();

    repository = module.get<LeaseItemsRepository>(LeaseItemsRepository);
  });

  it('repository should be definded', () => {
    expect(repository).toBeDefined();
  });

  it('return an item from DB estrict equal to input item', async () => {
    const itemInput = {
      id_lease_imobzi: '2312312312312',
      due_date: new Date('2023-02-01'),
      description: 'IPTU',
      management_fee: true,
      recurrent: true,
      value: 100,
      until_due_date: false,
      behavior: 'something',
      repeat_index: 3,
      include_in_dimob: true,
      start_date: new Date('2023-01-01'),
      repeat_total: 10,
    };

    const result = await repository.findStrictEqual(itemInput);
    const id = result.id;
    expect(result).toEqual({ ...itemInput, id });
  });
});
