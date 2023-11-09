import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceItemsRepository } from './invoice_items.repository';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsRepository: InvoiceItemsRepository) {}

  @Get()
  findAll() {
    return this.invoiceItemsRepository.findAll();
  }

  @Get(':id')
  findOne(@Param() id_imobzi: string) {
    return this.invoiceItemsRepository.findById(id_imobzi);
  }
}
