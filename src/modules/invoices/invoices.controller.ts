import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/http-excepetion.filter';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { InvoicesRepository } from './invoices.repository';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  @Post()
  async create(@Body() data: CreateInvoiceDTO) {
    return await this.invoicesRepository.create(data);
  }

  @Get()
  async findAll() {
    return await this.invoicesRepository.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async findById(@Param('id') id: string) {
    return await this.invoicesRepository.findById(id);
  }

  @Put(':id')
  async update(@Param() id_imobzi: string, @Body() data: CreateInvoiceDTO) {
    return await this.invoicesRepository.update(id_imobzi, data);
  }
}
