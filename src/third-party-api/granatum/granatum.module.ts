import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SharedModule } from '../shared.module';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';

@Module({
  imports: [GranatumTransactionsModule, GranatumCategoriesModule, SharedModule],
  providers: [GranatumTransactionsService, GranatumCategoriesService, PrismaService],
})
export class GranatumModule {}
