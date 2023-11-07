import { Injectable } from '@nestjs/common';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { StoreDb } from './interfaces/imobziQueue.interface';

@Injectable()
export class QueueImobziService {
  constructor(private readonly queueImobziProducer: QueueImobziProducer) {}
  async storeDb(data: StoreDb) {
    const { contacts, buildings, properties, leases, invoices } = data;
    if (contacts) {
      await this.queueImobziProducer.contacts.produce();
    }

    if (buildings) {
      await this.queueImobziProducer.buildings.produce();
    }

    if (properties) {
      await this.queueImobziProducer.properties.produce();
    }

    if (leases) {
      await this.queueImobziProducer.leases.produce();
    }

    if (invoices) {
      await this.queueImobziProducer.invoices.produce();
    }
  }
}
