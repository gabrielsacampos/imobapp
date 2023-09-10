import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesCreateDTO } from './leasesCreate.dtos';
import { LeasesUpdateDTO } from './leasesUpdate.dtos';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Get()
  async findAll() {
    return await this.leasesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.leasesService.findById(id);
  }

  @Post()
  async create(@Body() data: LeasesCreateDTO) {
    return await this.leasesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: LeasesUpdateDTO) {
    return await this.leasesService.update(id, data);
  }
}
