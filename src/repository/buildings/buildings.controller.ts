import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { UpdateBuildingDTO } from './dtos/update-building.dtos';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  async findAll() {
    return await this.buildingsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.buildingsService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateBuildingDTO) {
    return await this.buildingsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBuildingDTO) {
    return await this.buildingsService.update(id, data);
  }
}
