import { Injectable } from '@nestjs/common';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
  constructor(private readonly leasesRepository: LeasesRepository) {}

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
    return this.leasesRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.leasesRepository.update(data.id_imobzi, data);
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
