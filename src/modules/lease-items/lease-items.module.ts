import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeaseItemsRepository } from './lease-items.repository';
import { LeaseItemsService } from './lease-items.service';

@Module({
  providers: [LeaseItemsRepository, LeaseItemsService, PrismaService],
  exports: [LeaseItemsService, LeaseItemsRepository],
})
export class LeaseItemsModule {}
