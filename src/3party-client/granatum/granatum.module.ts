import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCategoriesModule } from './granatum-categories/granatum-categories.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumCostumersModule } from './granatum-costumers/granatum-costumers.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatum-transactions.module';
import { GranatumController } from './granatum.controller';
import { GranatumService } from './granatum.service';

@Module({
  imports: [
    SharedModule,
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumCostumersModule,
    GranatumSupliersModule,
  ],
  controllers: [GranatumController],
  providers: [GranatumService],
  exports: [
    GranatumService,
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumCostumersModule,
    GranatumSupliersModule,
  ],
})
export class GranatumModule {}
