import { Module } from '@nestjs/common';
import { QueuesModule } from 'src/queues/queues.module';
import { RepositoryModule } from 'src/repository/repository.module';
import { SharedModule } from '../shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumClientsModule } from './granatum-clients/granatum-clients.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumController } from './granatum.controller';
import { GranatumService } from './granatum.service';

@Module({
  imports: [
    SharedModule,
    QueuesModule,
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumClientsModule,
    GranatumSupliersModule,
    RepositoryModule,
  ],
  controllers: [GranatumController],
  providers: [GranatumService, GranatumService, GranatumTransactionsService],
  exports: [GranatumService],
})
export class GranatumModule {}
