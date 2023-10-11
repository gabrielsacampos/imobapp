import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziController } from './imobzi.controllers';
import { ImobziBuildingsModule } from './imobzi-buildings/imobziBuildings.module';
import { ImobziContactsModule } from './imobzi-contacts/imobziContacts.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullModule } from '@nestjs/bull';
import { ImobziContactsService } from './imobzi-contacts/imobziContacts.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziService } from './imobzi.service';
import { ImobziQueueProducer } from './imobzi.queue.producer';
import { ImobziQueueConsumer } from './imobzi.queue.consumer';

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
    ImobziQueueProducer,
    ImobziQueueConsumer,
    ImobziContactsService,
    ImobziPropertiesService,
    ImobziBuildingsService,
    ImobziLeasesService,
    ImobziInvoicesService,
    ImobziService,
  ],
  exports: [
    ImobziService,
    ImobziInvoicesService,
    SharedModule,
    ImobziContactsService,
    ImobziPropertiesService,
    ImobziBuildingsService,
    ImobziLeasesService,
    ImobziService,
  ],
})
export class ImobziModule {}
