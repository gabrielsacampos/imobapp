import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { BuildingsRepository } from './buildings.repository';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService, PrismaService, BuildingsRepository],
  exports: [BuildingsService, BuildingsRepository],
})
export class BuildingsModule {}
