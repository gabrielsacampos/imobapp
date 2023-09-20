import { Module } from '@nestjs/common';
import { LeaseItemsService } from './lease-items.service';
import { LeaseItemsController } from './lease-items.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [LeaseItemsController],
  providers: [LeaseItemsService, PrismaService],
})
export class LeaseItemsModule {}
