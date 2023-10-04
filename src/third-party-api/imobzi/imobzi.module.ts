import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ImobziQueueConsumer } from './imobziQueue.consumer';
import { ImobziController } from './imobzi.controllers';
import { ImobziService } from './imobzi.service';
import { ImobziQueueProducer } from './imobziQueue.producer';
import { ImobziContactsService } from './imobzi-contacts/ImobziContacts.service';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziBuildingsModule } from './imobzi-buildings/imobziBuildings.module';
import { ImobziContactsModule } from './imobzi-contacts/imobziContacts.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { SharedModule } from '../shared.module';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
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
    ImobziContactsService,
    ImobziPropertiesService,
    ImobziBuildingsService,
    ImobziLeasesService,
    ImobziInvoicesService,
    ImobziService,
    ImobziQueueProducer,
    ImobziQueueConsumer,
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
    ImobziQueueProducer,
    ImobziQueueConsumer,
  ],
})
export class ImobziModule {}
