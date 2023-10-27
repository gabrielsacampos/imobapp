import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { ScheduleModule } from '@nestjs/schedule';
import { GranatumQueueController } from './granatumQueue.controller';
import { GranatumQueueService } from './granatumQueue.service';
import { GranatumQueueConsumer } from './granatumQueue.consumer';

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
  ],
  controllers: [GranatumQueueController],
  providers: [GranatumQueueService, GranatumQueueConsumer, GranatumQueueConsumer],
})
export class GranatumQueueModule {}
