import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InvoicesRepository } from './invoices.repository';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService, InvoicesRepository],
  exports: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
