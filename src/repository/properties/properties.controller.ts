import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() data: CreatePropertyDTO) {
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
  async update(@Param('id') id: string, @Body() data: CreatePropertyDTO) {
    return await this.propertiesService.upsert(data);
  }
}
