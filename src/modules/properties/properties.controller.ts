import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesCreateDTO } from './propertiesCreate.dtos';
import { PropertiesUpdateDTO } from './propertiesUpdate.dtos';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() data: PropertiesCreateDTO) {
    return await this.propertiesService.create(data);
  }

  @Get()
  async findAll() {
    return await this.propertiesService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.propertiesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: PropertiesUpdateDTO) {
    return await this.propertiesService.update(id, data);
  }
}
