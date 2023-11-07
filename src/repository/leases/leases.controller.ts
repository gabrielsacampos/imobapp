import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';
import { LeasesRepository } from './leases.repository';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesRepository: LeasesRepository) {}

  @Post('')
  async create(data: CreateLeaseDTO): Promise<Lease> {
    try {
      return await this.leasesRepository.create(data);
    } catch (error) {}
  }

  @Get(':id')
  async findById(@Param() id_imobzi: string): Promise<Lease> {
    try {
      return await this.leasesRepository.findById(id_imobzi);
    } catch (error) {}
  }

  @Get('')
  async findAll(): Promise<Lease[]> {
    try {
      return await this.leasesRepository.findAll();
    } catch (error) {}
  }

  @Put(':id')
  async update(@Param() id_imobzi: string, @Body() data: CreateLeaseDTO): Promise<Lease> {
    try {
      return await this.leasesRepository.update(id_imobzi, data);
    } catch (error) {}
  }
}
