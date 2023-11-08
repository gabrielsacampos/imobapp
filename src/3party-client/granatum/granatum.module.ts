import { Module } from '@nestjs/common';
import { InvoicesController } from 'src/repository/invoices/invoices.controller';
import { InvoicesModule } from 'src/repository/invoices/invoices.module';
import { SharedModule } from '../../shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesModule } from './granatum-categories/granatum-categories.module';
import { GranatumCategoriesService } from './granatum-categories/granatum-categories.service';
import { GranatumClientsModule } from './granatum-costumers/granatum-costumers.module';
import { GranatumClientsService } from './granatum-costumers/granatum-costumers.service';
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
    InvoicesModule,
  ],
  controllers: [GranatumController],
  providers: [
    InvoicesController,
    GranatumService,
    GranatumTransactionsService,
    GranatumCategoriesService,
    GranatumAccountsService,
    GranatumCostCenterService,
    GranatumClientsService,
    GranatumSupliersModule,
    InvoicesController,
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
