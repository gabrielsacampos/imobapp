import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueGranatumController } from './queue-granatum.controller';
import { QueueGranatumService } from './queue-granatum.service';
import { QueueGranatumConsumer } from './queue-granatum.consumer';
import { QueueGranatumProducer } from './queue-granatum.producer';
import { GranatumModule } from 'src/3party-client/granatum/granatum.module';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { InvoicesModule } from 'src/repository/invoices/invoices.module';
import { InvoicesController } from 'src/repository/invoices/invoices.controller';
import { InvoicesRepository } from 'src/repository/invoices/invoices.repository';

@Module({
  imports: [
    InvoicesModule,
    GranatumModule,
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
  ],
  controllers: [QueueGranatumController],
  providers: [
    QueueGranatumService,
    QueueGranatumProducer,
    QueueGranatumConsumer,
    GranatumService,
    InvoicesController,
    InvoicesService,
    InvoicesRepository
  ],
  exports: [
    QueueGranatumService,
    QueueGranatumProducer,
    QueueGranatumConsumer,
    GranatumService,
    InvoicesController,
    InvoicesService,
  ],
})
export class QueueGranatumModule {}
