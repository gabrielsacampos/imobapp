import { Controller } from '@nestjs/common';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';
import { LeasesRepository } from './leases.repository';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesRepository: LeasesRepository) {}
  async create(data: CreateLeaseDTO): Promise<Lease> {
    try {
      return await this.leasesRepository.create(data);
    } catch (error) {}
  }

  async findById(id_imobzi: string): Promise<Lease> {
    try {
      return await this.leasesRepository.findById(id_imobzi);
    } catch (error) {}
  }

  async findAll(): Promise<Lease[]> {
    try {
      return await this.leasesRepository.findAll();
    } catch (error) {}
  }

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
    try {
      return await this.leasesRepository.upsert(data);
    } catch (error) {}
  }
}
