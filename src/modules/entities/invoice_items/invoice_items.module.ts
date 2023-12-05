import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice_items.service';
import { InvoiceItemsController } from './invoice_items.controller';
import { InvoiceItemsRepository } from './invoice_items.repository';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Module({
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService, InvoiceItemsRepository, PrismaService],
})
export class InvoiceItemsModule {}
