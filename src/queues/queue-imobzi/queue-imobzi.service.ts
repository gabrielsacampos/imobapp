import { Injectable } from '@nestjs/common';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { StoreDb } from './interfaces/imobziQueue.interface';

@Injectable()
export class QueueImobziService {
  constructor(private readonly queueImobziProducer: QueueImobziProducer) {}
  async storeDb(data: StoreDb) {
    try {
      const { contacts, buildings, properties, leases, invoices } = data;
      if (contacts) {
        await this.queueImobziProducer.produceContacts();
      }

      if (buildings) {
        await this.queueImobziProducer.produceBuildings();
      }

      if (properties) {
        await this.queueImobziProducer.produceProperties();
      }

      if (leases) {
        await this.queueImobziProducer.produceLeases();
      }

      if (invoices) {
        await this.queueImobziProducer.produceInvoices();
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
