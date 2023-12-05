import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  @Post('')
  async create(@Body() data: CreateOrganizationDTO): Promise<Organization> {
    return await this.organizationsRepository.create(data);
  }

  @Put(':id')
  async update(@Param() id_imobzi: string, @Body() data: CreateOrganizationDTO): Promise<Organization> {
    return this.organizationsRepository.update(id_imobzi, data);
  }

  @Get(':id')
  async findById(@Param() id_imobzi: string): Promise<Organization> {
    return this.organizationsRepository.findById(id_imobzi);
  }

  @Get('')
  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.findAll();
  }
}
