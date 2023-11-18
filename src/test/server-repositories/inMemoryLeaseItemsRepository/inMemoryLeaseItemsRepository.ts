import { CreateLeaseItemsDTO } from 'src/modules/lease-items/dtos/create-leaseItems.dtos';
import { LeaseItems } from 'src/modules/lease-items/entities/leaseItems.entity';
import { LeaseItemsRepository } from 'src/modules/lease-items/lease-items.repository';

export class InMemoryLeasesItemsRepository implements Partial<LeaseItemsRepository> {
  items: LeaseItems[] = leaseItemsMock;

  async findStrictEqual(data: CreateLeaseItemsDTO): Promise<LeaseItems> {
    const result = await this.findFirst(data);
    return result;
  }

  async findFirst(data: CreateLeaseItemsDTO): Promise<LeaseItems> {
    return this.items.find((item) => {
      const propsToMatch = Object.keys(data);
      return propsToMatch.every((prop) => {
        const entryPropValue = data[prop];
        const itemPropValue = item[prop];

        // handle if props are DATE type. a simple prop === prop will not work correclty
        if (itemPropValue instanceof Date) {
          return item[prop].getTime() === data[prop].getTime();
        }
        return entryPropValue === itemPropValue;
      });
    });
  }
}

export const leaseItemsMock: LeaseItems[] = [
  {
    // id: 1,
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
  },
  {
    // id: 2,
    id_lease_imobzi: '2312312312312',
    due_date: new Date('2023-03-01'),
    description: 'IPTU',
    management_fee: true,
    recurrent: true,
    value: 100,
    until_due_date: false,
    behavior: 'something',
    repeat_index: 5,
    include_in_dimob: true,
    start_date: new Date('2023-04-01'),
    repeat_total: 10,
  },
];
