import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GranatumModule } from 'src/3party-client/granatum/granatum.module';
import { InvoicesModule } from 'src/modules/invoices/invoices.module';
import { ModulesModule } from 'src/modules/modules.module';
import { QueueGranatumConsumer } from './queue-granatum.consumer';
import { QueueGranatumController } from './queue-granatum.controller';
import { QueueGranatumProducer } from './queue-granatum.producer';
import { QueueGranatumService } from './queue-granatum.service';

@Module({
  imports: [
    ModulesModule,
    InvoicesModule,
    GranatumModule,
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
  providers: [QueueGranatumService, QueueGranatumProducer, QueueGranatumConsumer],
  exports: [QueueGranatumService, QueueGranatumProducer, QueueGranatumConsumer],
})
export class QueueGranatumModule {}
