import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice_item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice_item.dto';

@Injectable()
export class InvoiceItemsService {
  create(createInvoiceItemDto: CreateInvoiceItemDto) {
    return 'This action adds a new invoiceItem';
  }

  findAll() {
    return `This action returns all invoiceItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceItem`;
  }

  update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return `This action updates a #${id} invoiceItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceItem`;
  }
}
