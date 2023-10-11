import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PeopleCreateDTO } from './peopleCreate.dtos';
import { PeopleService } from './people.service';
import { PeopleUpdateDTO } from './peopleUpdate.dtos';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(@Body() data: PeopleCreateDTO) {
    return await this.peopleService.create(data);
  }

  @Get()
  async findAll() {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.peopleService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: PeopleUpdateDTO) {
    return await this.peopleService.update(id, data);
  }
}
