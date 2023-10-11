import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesController } from './leases.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService, PrismaService],
})
export class LeasesModule {}
