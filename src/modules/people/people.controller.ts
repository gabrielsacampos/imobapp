import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  @Get('')
  async findAll(): Promise<Person[]> {
    return await this.peopleRepository.findAll();
  }

  @Get('id/:id')
  async findById(id_imobzi: string) {
    return await this.peopleRepository.findById(id_imobzi);
  }

  @Post('')
  async create(@Body() data: CreatePersonDTO): Promise<Person> {
    return await this.peopleRepository.create(data);
  }

  @Put(':id')
  async update(@Param() id_imobzi: string, @Body() data: CreatePersonDTO): Promise<Person> {
    return await this.peopleRepository.update(id_imobzi, data);
  }
}
