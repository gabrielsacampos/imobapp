import { Injectable } from '@nestjs/common';
import { LeaseItemsRepository } from './lease-items.repository';

@Injectable()
export class LeaseItemsService {
  constructor(private readonly leaseItemsRepsository: LeaseItemsRepository) {}
}
