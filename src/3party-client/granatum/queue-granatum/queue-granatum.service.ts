import { Injectable } from '@nestjs/common';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { ModulesServices } from 'src/modules/modules.service';
import { FetchDb } from './interfaces/imobziQueue.interface';
import { QueueGranatumProducer } from './queue-granatum.producer';

@Injectable()
export class QueueGranatumService {
  constructor(
    private readonly queueGranatumProducer: QueueGranatumProducer,
    private readonly granatumService: GranatumService,
    private readonly modulesServices: ModulesServices,
  ) {}

  async fetchDb(data: FetchDb): Promise<void> {
    try {
      const { payment_start_at, payment_end_at, invoice, onlending, revenue } = data;

      let items: any[];
      let onlendings: any[];
      let revenues: any[];

      if (onlending) {
        onlendings = await this.modulesServices.invoices.predictedOnlendings(payment_start_at, payment_end_at);
      }

      if (invoice) {
        items = await this.modulesServices.invoices.paidInvoices(payment_start_at, payment_end_at);
      }

      if (revenue) {
        revenues = await this.modulesServices.invoices.predictedRevenues(payment_start_at, payment_end_at);
      }

      await this.queueGranatumProducer.produce({ items, onlendings, revenues });
    } catch (error) {
      throw new Error(error);
    }
  }
}
