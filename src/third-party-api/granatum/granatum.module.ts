import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { SharedModule } from '../shared.module';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumClientsModule } from './granatum-clients/granatum-clients.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumClientsService } from './granatum-clients/granatum-clients.service';
import { GranatumSupliersService } from './granatum-supliers/granatum-supliers.service';
import { GranatumService } from './granatum.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    SharedModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumClientsModule,
    GranatumSupliersModule,
  ],
  providers: [
    GranatumTransactionsService,
    GranatumCategoriesService,
    GranatumAccountsService,
    GranatumCostCenterService,
    GranatumClientsService,
    GranatumSupliersService,
    GranatumCategoriesService,
    GranatumService,
    PrismaService,
  ],
  exports: [GranatumService],
})
export class GranatumModule {}
