import { Module } from '@nestjs/common';
import { QueuesModule } from 'src/queues/queues.module';
import { RepositoryModule } from 'src/repository/repository.module';
import { SharedModule } from '../shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumClientsModule } from './granatum-clients/granatum-clients.module';
import { GranatumClientsService } from './granatum-clients/granatum-clients.service';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumController } from './granatum.controller';
import { GranatumService } from './granatum.service';

@Module({
  imports: [
    SharedModule,
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumClientsModule,
    GranatumSupliersModule,
    RepositoryModule,
  ],
  controllers: [GranatumController],
  providers: [
    GranatumService,
    GranatumTransactionsService,
    GranatumCategoriesService,
    GranatumAccountsService,
    GranatumCostCenterService,
    GranatumClientsService,
    GranatumSupliersModule,
  ],
  exports: [
    GranatumService,
    GranatumTransactionsService,
    GranatumCategoriesService,
    GranatumAccountsService,
    GranatumCostCenterService,
    GranatumClientsService,
    GranatumSupliersModule,
  ],
})
export class GranatumModule {}
