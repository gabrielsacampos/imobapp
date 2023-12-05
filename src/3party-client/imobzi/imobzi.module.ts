import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerQueueModule } from 'src/modules/entities/logger/logger-queue.module';
import { ModulesModule } from 'src/modules/entities/modules.module';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsModule } from './imobzi-buildings/imobzi-buildings.module';
import { ImobziBuildingsService } from './imobzi-buildings/imobzi-buildings.service';
import { ImobziContactsModule } from './imobzi-contacts/imobziContacts.module';
import { ImobziContactsRepository } from './imobzi-contacts/imobziContacts.repository';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziController } from './imobzi.controllers';
import { ImobziRepository } from './imobzi.repository';
import { ImobziService } from './imobzi.service';
import { QueueImobziConsumer } from './queue-imobzi.consumer';
import { QueueImobziProducer } from './queue-imobzi.producer';

@Module({
  imports: [
    LoggerQueueModule,
    ScheduleModule.forRoot(),
    ModulesModule,
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
    ModulesModule,
    SharedModule,
    ImobziBuildingsModule,
    ImobziContactsModule,
    ImobziPeopleModule,
    ImobziOrganizationsModule,
    ImobziPropertiesModule,
    ImobziLeasesModule,
    ImobziInvoicesModule,
  ],
  controllers: [ImobziController],
  providers: [
    QueueImobziProducer,
    QueueImobziConsumer,
    ImobziService,
    ImobziContactsRepository,
    ImobziBuildingsService,
    ImobziPropertiesService,
    ImobziLeasesService,
    ImobziInvoicesService,
    ImobziRepository,
  ],
  exports: [
    QueueImobziProducer,
    QueueImobziConsumer,
    ImobziService,
    ImobziContactsRepository,
    ImobziBuildingsService,
    ImobziPropertiesService,
    ImobziLeasesService,
    ImobziInvoicesService,
    ImobziRepository,
  ],
})
export class ImobziModule { }
