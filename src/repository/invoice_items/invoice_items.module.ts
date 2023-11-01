import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice_items.service';
import { InvoiceItemsController } from './invoice_items.controller';

@Module({
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
