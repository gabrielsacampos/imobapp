import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PropertiesController } from './properties.controller';
import { PropertiesRepository } from './properties.repository';
import { PropertiesService } from './properties.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService, PropertiesRepository],
  exports: [PropertiesService, PropertiesRepository],
})
export class PropertiesModule {}
