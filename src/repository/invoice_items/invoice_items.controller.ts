import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceItemsService } from './invoice_items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice_item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice_item.dto';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Post()
  create(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return this.invoiceItemsService.create(createInvoiceItemDto);
  }

  @Get()
  findAll() {
    return this.invoiceItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return this.invoiceItemsService.update(+id, updateInvoiceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemsService.remove(+id);
  }
}
