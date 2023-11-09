import { Injectable } from '@nestjs/common';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
  constructor(private readonly leasesRepository: LeasesRepository) {}

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
    try {
      const found = this.leasesRepository.findById(data.id_imobzi);
      if (found) {
        return this.leasesRepository.update(data.id_imobzi, data);
      } else {
        return this.leasesRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
