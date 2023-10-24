import { Injectable } from '@nestjs/common';
import { GetPaidItemDTO } from 'src/repository/modules/invoices/dtos/return-invoice.queries.dtos';
import { InvoicesService } from 'src/repository/modules/invoices/invoices.service';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GroupItems } from './interfaces/granatum.service.interface';

@Injectable()
export class GranatumService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly granatumQueue: GranatumQueueProducer,
  ) {}

  async storeItemsFromDb(start_at: string, end_at: string): Promise<void> {
    const items = await this.invoicesService.getPaidItems(start_at, end_at);
    const groupedItems = this.groupItemsFromDb(items);
    this.granatumQueue.startSyncImobziGranatum(groupedItems);
  }

  groupItemsFromDb(items: GetPaidItemDTO[]): GroupItems[] {
    const groupedItems = items.reduce((acc, curr) => {
      const key = curr.credit_at + ' | ' + curr.account_credit + ' | ' + curr.paid_manual;
      if (!acc[key]) {
        acc[key] = {
          count_invoices: 1,
          paid_at: curr.paid_at,
          credit_at: curr.credit_at,
          account_credit: curr.account_credit,
          description: curr.paid_manual ? `Transaferência recebida em conta` : `Cobranças Imobzi`,
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
        acc[key].count_invoices++;
      }

      return acc;
    }, []);

    return Object.values(groupedItems);
  }
}
