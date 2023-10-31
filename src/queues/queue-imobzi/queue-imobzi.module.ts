import { Module } from '@nestjs/common';
import { QueueImobziService } from './queue-imobzi.service';
import { QueueImobziController } from './queue-imobzi.controller';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { QueueImobziConsumer } from './queue-imobzi.consumer';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { ExpressAdapter } from '@bull-board/express';
import { ImobziModule } from 'src/3party-client/imobzi/imobzi.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [
    ImobziModule,
    RepositoryModule,
    BullModule.forRoot({
      url: process.env.redis_url,
    }),
    BullModule.registerQueue({
      name: 'ImobziQueue',
    }),
    BullBoardModule.forFeature({
      name: 'ImobziQueue',
      adapter: BullAdapter,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
  ],
  controllers: [QueueImobziController],
  providers: [QueueImobziService, QueueImobziProducer, QueueImobziConsumer],
  exports: [QueueImobziService, QueueImobziProducer, QueueImobziConsumer],
})
export class QueueImobziModule {}
