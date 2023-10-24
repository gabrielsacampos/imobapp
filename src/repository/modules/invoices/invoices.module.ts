import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
