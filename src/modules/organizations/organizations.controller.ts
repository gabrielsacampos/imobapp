import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationsCreateDTO } from './organizationsCreate.dtos';
import { OrganizationsService } from './organizations.service';
import { OrganizationsUpdateDTO } from './organizationsUpdate.dtos';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get('all')
  async findAll() {
    return await this.organizationsService.findAll();
  }

  @Post('create')
  async create(@Body() data: OrganizationsCreateDTO) {
    return await this.organizationsService.create(data);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: OrganizationsUpdateDTO) {
    return await this.organizationsService.update(id, data);
  }
}
