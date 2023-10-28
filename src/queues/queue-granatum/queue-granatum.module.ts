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
import { GranatumModule } from 'src/granatum/granatum.module';
import { RepositoryModule } from 'src/repository/repository.module';
import { GranatumService } from 'src/granatum/granatum.service';
import { InvoicesService } from 'src/repository/invoices/invoices.service';

@Module({
  imports: [
    GranatumModule,
    RepositoryModule,
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
  providers: [QueueGranatumService, QueueGranatumProducer, QueueGranatumConsumer, GranatumService, InvoicesService],
  exports: [QueueGranatumService, QueueGranatumProducer, QueueGranatumConsumer, GranatumService, InvoicesService],
})
export class QueueGranatumModule {}
