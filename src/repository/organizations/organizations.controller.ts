import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsRepository: OrganizationsRepository) {}

  @Post('')
  async create(@Body() data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return await this.organizationsRepository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param() id_imobzi: string, @Body() data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return this.organizationsRepository.update(id_imobzi, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findById(@Param() id_imobzi: string): Promise<Organization> {
    try {
      return this.organizationsRepository.findById(id_imobzi);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('')
  async findAll(): Promise<Organization[]> {
    try {
      return this.organizationsRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}
