import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PeopleDTO } from './people.dtos';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post('create')
  async create(@Body() data: PeopleDTO) {
    return await this.peopleService.create(data);
  }

  @Get('all')
  async findAll() {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const dataBigInt = BigInt(id);
    return await this.peopleService.findById(dataBigInt);
  }
}
