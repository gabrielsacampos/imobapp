import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesController } from './leases.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeasesRepository } from './leases.repository';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService, LeasesController, PrismaService, LeasesRepository, LeasesController],
  exports: [LeasesController],
})
export class LeasesModule {}
