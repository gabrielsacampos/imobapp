import { Injectable } from '@nestjs/common';
import { InvoicesService } from 'src/repository/modules/invoices/invoices.service';
import { GranatumQueueProducer } from './granatum.queue.producer';

@Injectable()
export class GranatumService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly granatumQueue: GranatumQueueProducer,
  ) {}

  async storeItemsFromDb(start_at: string, end_at: string) {
    const itemsFromDb = await this.invoicesService.getItemsPaid(start_at, end_at);
    const invoicesFromDb = await this.invoicesService.getInvoicesSimpleData(start_at, end_at);
    const invoicesWithItems = this.setItemsIntoInvoices(invoicesFromDb, itemsFromDb);
    this.granatumQueue.syncImobziGranatumTransactions(invoicesWithItems);
  }

  setItemsIntoInvoices(invoices, items): any[] {
    invoices.forEach((invoice) => {
      const itemsFromInvoice = items.filter((item) => {
        return item.id_invoice === invoice.id_imobzi;
      });
      invoice.items = itemsFromInvoice;
    });
    return invoices;
  }
}
