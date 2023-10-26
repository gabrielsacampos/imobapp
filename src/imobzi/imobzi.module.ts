import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsModule } from './imobzi-buildings/imobziBuildings.module';
import { ImobziContactsModule } from './imobzi-contacts/imobziContacts.module';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziController } from './imobzi.controllers';
import { ImobziQueueConsumer } from './imobzi.queue.consumer';
import { ImobziQueueProducer } from './imobzi.queue.producer';
import { ImobziService } from './imobzi.service';

@Module({
  imports: [
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
    SharedModule,
    ScheduleModule.forRoot(),
    ImobziBuildingsModule,
    ImobziContactsModule,
    ImobziPeopleModule,
    ImobziOrganizationsModule,
    ImobziPropertiesModule,
    ImobziLeasesModule,
    ImobziInvoicesModule,
    RepositoryModule,
  ],
  controllers: [ImobziController],
  providers: [ImobziQueueProducer, ImobziQueueConsumer, ImobziService, FailedQueueJobsService],
  exports: [ImobziService],
})
export class ImobziModule {}
