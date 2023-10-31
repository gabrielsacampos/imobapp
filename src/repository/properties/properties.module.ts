import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PropertiesRepository } from './properties.repository';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService, PropertiesRepository],
  exports: [PropertiesService],
})
export class PropertiesModule {}
