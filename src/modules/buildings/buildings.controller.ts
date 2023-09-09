import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsCreateDTO } from './buildingsCreate.dtos';
import { BuildingsUpdateDTO } from './buildingsUpdate.dtos';

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
  async create(@Body() data: BuildingsCreateDTO) {
    return await this.buildingsService.create(data);
  }

  @Put(':id')
  async update(@Body('id') id: string, data: BuildingsUpdateDTO) {
    return await this.buildingsService.update(id, data);
  }
}
