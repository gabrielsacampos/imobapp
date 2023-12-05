import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { UpdatesController } from './updates.controller';
import { UpdatesRepository } from './updates.repository';
import { UpdatesService } from './updates.service';

@Module({
  controllers: [UpdatesController],
  providers: [UpdatesService, UpdatesRepository, PrismaService],
  exports: [UpdatesService, UpdatesRepository],
})
export class UpdatesModule {}
