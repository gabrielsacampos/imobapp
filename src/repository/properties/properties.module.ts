import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
