import { Injectable, Logger } from '@nestjs/common';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { StoreDb } from './interfaces/imobziQueue.interface';

@Injectable()
export class QueueImobziService {
  private logger = new Logger('QueueImobziService');
  constructor(private readonly queueImobziProducer: QueueImobziProducer) {}
  async storeDb(data: StoreDb) {
    try {
      const { contacts, buildings, properties, leases, invoices } = data;
      if (contacts) {
        this.logger.verbose(`imobziQueue calling producer.produceContacts()`);
        await this.queueImobziProducer.produceContacts();
      }

      if (buildings) {
        this.logger.verbose(`imobziQueue calling producer.produceBuilding()`);
        await this.queueImobziProducer.produceBuildings();
      }

      if (properties) {
        this.logger.verbose(`imobziQueue calling producer.produceProperties()`);
        await this.queueImobziProducer.produceProperties();
      }

      if (leases) {
        this.logger.verbose(`imobziQueue calling producer.produceLeases()`);
        await this.queueImobziProducer.produceLeases();
      }

      if (invoices) {
        this.logger.verbose(`imobziQueue calling producer.produceInvoices()`);
        await this.queueImobziProducer.produceInvoices();
      }
    } catch (error) {
      this.logger.error(`Failed on storeDb(): ${error.message}`, error.stack);
      throw new Error(error);
    }
  }
}
