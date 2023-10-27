import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { SharedModule } from '../shared.module';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCategoriesModule } from './granatum-categories/granatumCategories.module';
import { GranatumClientsModule } from './granatum-clients/granatum-clients.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumController } from './granatum.controller';
import { GranatumQueueConsumer } from './granatum.queue.consumer';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GranatumService } from './granatum.service';

@Module({
  imports: [
    SharedModule,
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
    GranatumAccountsModule,
    GranatumCostCenterModule,
    GranatumClientsModule,
    GranatumSupliersModule,
    RepositoryModule,
  ],
  controllers: [GranatumController],
  providers: [GranatumService, GranatumQueueProducer, GranatumQueueConsumer, GranatumService, FailedQueueJobsService],
  exports: [GranatumService],
})
export class GranatumModule {}
