import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationsCreateDTO } from './organizationsCreate.dtos';
import { OrganizationsService } from './organizations.service';
import { OrganizationsUpdateDTO } from './organizationsUpdate.dtos';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll() {
    return await this.organizationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.organizationsService.findById(id);
  }

  @Post()
  async create(@Body() data: OrganizationsCreateDTO) {
    return await this.organizationsService.create(data);
  }

  @Put()
  async update(@Param('id') id: string, @Body() data: OrganizationsUpdateDTO) {
    return await this.organizationsService.update(id, data);
  }
}
