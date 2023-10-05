import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceCreateDTO } from './invoicesCreate.dtos';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() data: InvoiceCreateDTO) {
    return await this.invoicesService.create(data);
  }

  @Get()
  async findAll() {
    return await this.invoicesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.invoicesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: InvoiceCreateDTO) {
    return await this.invoicesService.update(id, data);
  }
}
