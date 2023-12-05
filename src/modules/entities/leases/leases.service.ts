import { Injectable } from '@nestjs/common';
import { LeaseItemsService } from '../lease-items/lease-items.service';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { UpdateLeaseDTO } from './dtos/update-lease.dtos';
import { Lease } from './entities/lease.entity';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
  constructor(
    private readonly leasesRepository: LeasesRepository,
    private readonly leaseItemsService: LeaseItemsService,
  ) { }

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
    return this.leasesRepository
      .findById(data.id_imobzi)
      .then(async () => {
        const newItemsOnLease = await this.leaseItemsService.catchUpdates(data.leaseItems);
        const leaseToUpdate: UpdateLeaseDTO = { ...data, leaseItems: newItemsOnLease };
        return this.leasesRepository.update(leaseToUpdate.id_imobzi, leaseToUpdate);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.leasesRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }
}
