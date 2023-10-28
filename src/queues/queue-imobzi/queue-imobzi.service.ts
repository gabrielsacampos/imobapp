import { Injectable } from '@nestjs/common';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { StoreDb } from './interfaces/imobziQueue.interface';

@Injectable()
export class QueueImobziService {
  constructor(private readonly QueueImobziProducer: QueueImobziProducer) {}
  async storeDb(data: StoreDb) {
    const { contacts, buildings, properties, leases, invoices } = data;
    if (contacts) {
      await this.QueueImobziProducer.produceContacts();
    }

    if (buildings) {
      await this.QueueImobziProducer.produceBuildings();
    }

    if (properties) {
      await this.QueueImobziProducer.produceProperties();
    }

    if (leases) {
      await this.QueueImobziProducer.produceLeases();
    }

    if (invoices) {
      await this.QueueImobziProducer.produceInvoices();
    }
  }
}
