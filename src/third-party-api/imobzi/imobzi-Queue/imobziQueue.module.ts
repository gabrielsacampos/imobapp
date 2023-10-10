import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { SharedModule } from 'src/third-party-api/shared.module';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ImobziQueueService } from './imobziQueue.service';
import { ImobziQueueProducer } from './imobziQueue.producer';
import { ImobziQueueConsumer } from './imobziQueue.consumer';
import { ImobziModule } from '../imobzi.module';
import { ImobziContactsService } from '../imobzi-contacts/imobziContacts.service';
import { ImobziPropertiesService } from '../imobzi-properties/imobziProperties.service';
import { ImobziBuildingsService } from '../imobzi-buildings/imobziBuildings.service';
import { ImobziLeasesService } from '../imobzi-leases/imobziLeases.service';
import { ImobziInvoicesService } from '../imobzi-invoices/imobziInvoices.service';
import { ImobziService } from '../imobzi.service';
import { ImobziPeopleService } from '../imobzi-people/imobziPeople.service';
import { ImobziOrganizationsService } from '../imobzi-organizations/imobziOrganizations.service';
import { ImobziQueueController } from './imobziQueue.controller';

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
    ImobziModule,
  ],
  controllers: [ImobziQueueController],
  providers: [
    ImobziQueueService,
    ImobziQueueProducer,
    ImobziQueueConsumer,
    ImobziContactsService,
    ImobziPeopleService,
    ImobziOrganizationsService,
    ImobziPropertiesService,
    ImobziBuildingsService,
    ImobziLeasesService,
    ImobziInvoicesService,
    ImobziService,
  ],
  exports: [ImobziQueueService, ImobziQueueConsumer, ImobziQueueProducer],
})
export class ImobziQueueModule {}
