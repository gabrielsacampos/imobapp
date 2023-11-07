import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDTO } from './dtos/create-building.dtos';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsRepository: BuildingsRepository) {}

  @Get()
  async findAll() {
    try {
      return await this.buildingsRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.buildingsRepository.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() data: CreateBuildingDTO) {
    try {
      return await this.buildingsRepository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param() id: string, data: CreateBuildingDTO) {
    try {
      return await this.buildingsRepository.update(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
