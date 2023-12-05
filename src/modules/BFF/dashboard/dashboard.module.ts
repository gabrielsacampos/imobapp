import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { ModulesModule } from 'src/modules/entities/modules.module';
import { DashboardController } from './dashboard.controller';
import { DashboardRepository } from './dashboard.repository';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [ModulesModule],
  controllers: [DashboardController],
  providers: [PrismaService, DashboardRepository, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule { }
