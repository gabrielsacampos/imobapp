import { Body, Controller, Param, Post } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { invoiceItemsCreateDTO } from './invoiceItemsCreate.dtos';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Post(':id')
  async create(@Param('id') id: string, @Body() data: invoiceItemsCreateDTO[]) {
    return this.invoiceItemsService.create(id, data);
  }
}
