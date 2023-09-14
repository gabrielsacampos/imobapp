import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { invoiceItemsCreateDTO } from './invoiceItemsCreate.dtos';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Get(':id')
  async findByInvoiceId(@Param('id') id: string) {
    return await this.invoiceItemsService.findByInvoiceId(id);
  }
  @Post(':id')
  async create(@Param('id') id: string, @Body() data: invoiceItemsCreateDTO[]) {
    return this.invoiceItemsService.create(id, data);
  }

  @Put(':id')
  async updateInvoiceItems(
    @Param('id') id: string,
    @Body() data: invoiceItemsCreateDTO[],
  ) {
    return this.invoiceItemsService.updateInvoiceItems(id, data);
  }
}
