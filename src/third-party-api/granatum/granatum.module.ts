import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SharedModule } from '../shared.module';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';

@Module({
  imports: [GranatumTransactionsModule, GranatumCategoriesModule, SharedModule, GranatumAccountsModule, GranatumCostCenterModule],
  providers: [GranatumTransactionsService, GranatumCategoriesService, PrismaService],
})
export class GranatumModule {}
