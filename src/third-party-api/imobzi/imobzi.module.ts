import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziContactsModule } from 'src/third-party-api/imobzi/imobzi-contacts/imobziContacts.module';
import { ImobziQueueConsumer } from './imobziQueue.consumer';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziController } from './imobzi.controllers';
import { ImobziService } from './imobzi.service';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ImobziQueueProducer } from './imobziQueue.producer';
import { ImobziContactsService } from './imobzi-contacts/ImobziContacts.service';
import { ImobziBuildingsModule } from './imobzi-buildings/imobziBuildings.module';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { HttpModule } from '@nestjs/axios';
import { ImobziParamService, ImobziUrlService } from './imobzi-urls-params/imobziUrls.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    BullModule.registerQueue({
      name: 'ImobziQueue',
    }),
    BullBoardModule.forFeature({
      name: 'ImobziQueue',
      adapter: BullAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
    ImobziContactsModule,
    ImobziPeopleModule,
    ImobziOrganizationsModule,
    ImobziPropertiesModule,
    ImobziBuildingsModule,
    ImobziLeasesModule,
    ImobziInvoicesModule,
  ],
  controllers: [ImobziController],
  providers: [
    PrismaService,
    ImobziContactsService,
    ImobziPropertiesService,
    ImobziBuildingsService,
    ImobziService,
    ImobziQueueProducer,
    ImobziQueueConsumer,
    ImobziUrlService,
    ImobziParamService,
  ],
  exports: [ImobziService],
})
export class ImobziModule {}
