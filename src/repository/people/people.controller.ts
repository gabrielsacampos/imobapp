import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PeopleService } from './people.service';
import { UpdatePersonDTO } from './dtos/update-person.dtos';
import { CreatePersonDTO } from './dtos/create-person.dtos';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(@Body() data: CreatePersonDTO) {
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
  async update(@Param('id') id: string, @Body() data: UpdatePersonDTO) {
    return await this.peopleService.update(id, data);
  }
}
