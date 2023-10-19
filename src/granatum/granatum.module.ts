import { Module } from '@nestjs/common';
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
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GranatumQueueConsumer } from './granatum.queue.consumer';
import { GranatumController } from './granatum.controller';
import { InvoicesService } from 'src/repository/modules/invoices/invoices.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    GranatumTransactionsModule,
    GranatumCategoriesModule,
    SharedModule,
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumClientsModule,
    GranatumSupliersModule,
  ],
  controllers: [GranatumController],
  providers: [
    GranatumQueueProducer,
    GranatumQueueConsumer,
    GranatumTransactionsService,
    GranatumCategoriesService,
    GranatumAccountsService,
    GranatumCostCenterService,
    GranatumClientsService,
    GranatumSupliersService,
    GranatumCategoriesService,
    GranatumService,
    InvoicesService,
  ],
  exports: [GranatumService],
})
export class GranatumModule {}
