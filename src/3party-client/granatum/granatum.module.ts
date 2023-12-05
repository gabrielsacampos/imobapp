import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { InvoicesModule } from 'src/modules/entities/invoices/invoices.module';
import { ModulesModule } from 'src/modules/entities/modules.module';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCategoriesModule } from './granatum-categories/granatum-categories.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumCostumersModule } from './granatum-costumers/granatum-costumers.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatum-transactions.module';
import { GranatumController } from './granatum.controller';
import { GranatumService } from './granatum.service';
import { QueueGranatumConsumer } from './queue-granatum.consumer';
import { QueueGranatumProducer } from './queue-granatum.producer';

@Module({
  imports: [
    ModulesModule,
    InvoicesModule,
    BullModule.forRoot({
      url: process.env.redis_url,
    }),
    BullModule.registerQueue({
      name: 'GranatumQueue',
    }),
    BullBoardModule.forFeature({
      name: 'GranatumQueue',
      adapter: BullAdapter,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    SharedModule,
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumCostumersModule,
    GranatumSupliersModule,
  ],
  controllers: [GranatumController],
  providers: [GranatumService, QueueGranatumConsumer, QueueGranatumProducer],
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
