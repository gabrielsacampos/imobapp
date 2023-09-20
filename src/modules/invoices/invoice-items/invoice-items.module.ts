import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceItemsController } from './invoice-items.controller';
import { PrismaService } from 'database/prisma.service';

@Module({
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService, PrismaService],
})
export class InvoiceItemsModule {}
