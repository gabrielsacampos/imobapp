import { Body, Controller, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { StoreDb } from './interfaces/imobziQueue.interface';

@Controller('imobzi')
export class ImobziController {
  private logger = new Logger('QueueImobziController');
  constructor(private readonly queueImobziProducer: QueueImobziProducer) {}

  @Post('backup')
  async backupImobzi(@Body() data: StoreDb) {
    try {
      const { contacts, buildings, properties, leases, invoices } = data;

      if (contacts) {
        this.queueImobziProducer.produceContacts();
      }

      if (buildings) {
        this.queueImobziProducer.produceBuildings();
      }

      if (properties) {
        this.queueImobziProducer.produceProperties();
      }

      if (leases) {
        this.queueImobziProducer.produceLeases();
      }

      if (invoices) {
        this.queueImobziProducer.produceInvoices(invoices.start_due_date);
      }

      return { message: 'running imobziQueue' };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
