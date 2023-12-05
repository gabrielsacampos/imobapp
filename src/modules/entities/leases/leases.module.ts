import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesController } from './leases.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeasesRepository } from './leases.repository';
import { LeaseItemsModule } from '../lease-items/lease-items.module';

@Module({
  imports: [LeaseItemsModule],
  controllers: [LeasesController],
  providers: [LeasesService, LeasesRepository, PrismaService],
  exports: [LeasesService, LeasesRepository],
})
export class LeasesModule {}
