import { Injectable } from '@nestjs/common';
import { LeaseItemsRepository } from './lease-items.repository';
import { CreateLeaseItemsDTO } from './dtos/create-leaseItems.dtos';

@Injectable()
export class LeaseItemsService {
  constructor(private readonly leaseItemsRepsository: LeaseItemsRepository) {}

  async catchUpdates(leaseItems: CreateLeaseItemsDTO[]): Promise<CreateLeaseItemsDTO[]> {
    const newItemsUpdates: CreateLeaseItemsDTO[] = [];
    for (const item of leaseItems) {
      const found = await this.leaseItemsRepsository.findStrictEqual(item);
      if (!found) {
        newItemsUpdates.push(item);
      }
    }

    if (newItemsUpdates.length > 0) {
      return newItemsUpdates;
    }

    return undefined;
  }
}
