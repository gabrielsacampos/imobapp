import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/modules/invoice_items/dto/create-invoice_item.dto';
import { InvoiceItem } from 'src/modules/invoice_items/entities/invoice_item.entity';
import { InvoiceItemsRepository } from 'src/modules/invoice_items/invoice_items.repository';
import { inMemoryInvoiceItemsRepositoryMock } from './inMemoryInvoiceItemsRepository.mocks';

export class InMemoryInvoiceItemsRepository implements Partial<InvoiceItemsRepository> {
  items: InvoiceItem[] = inMemoryInvoiceItemsRepositoryMock;

  async findAll(): Promise<InvoiceItem[]> {
    return this.items;
  }

  async findById(id_imobzi: string): Promise<InvoiceItem> {
    const found = this.items.find((item) => item.id_imobzi === id_imobzi);
    if (!found) {
      throw new NotFoundException(`item not found`);
    }
    return found;
  }
}
