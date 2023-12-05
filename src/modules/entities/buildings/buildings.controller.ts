import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDTO } from './dtos/create-building.dtos';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsRepository: BuildingsRepository) {}

  @Get('')
  async findAll() {
    return await this.buildingsRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.buildingsRepository.findById(id);
  }

  @Post()
  async create(@Body() data: CreateBuildingDTO) {
    return await this.buildingsRepository.create(data);
  }

  @Put(':id')
  async update(@Param() id: string, data: CreateBuildingDTO) {
    return await this.buildingsRepository.update(id, data);
  }
}
