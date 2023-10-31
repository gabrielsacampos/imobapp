import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoryModule } from 'src/repository/repository.module';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsModule } from './imobzi-buildings/imobziBuildings.module';
import { ImobziBuildingsService } from './imobzi-buildings/imobziBuildings.service';
import { ImobziContactsModule } from './imobzi-contacts/imobziContacts.module';
import { ImobziContactsService } from './imobzi-contacts/imobziContacts.service';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';

import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';
import { ImobziController } from './imobzi.controllers';
import { ImobziService } from './imobzi.service';

@Module({
  imports: [
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
  providers: [
    ImobziService,
    ImobziContactsService,
    ImobziBuildingsService,
    ImobziPropertiesService,
    ImobziLeasesService,
    ImobziInvoicesService,
  ],
  exports: [
    ImobziService,
    ImobziContactsService,
    ImobziBuildingsService,
    ImobziPropertiesService,
    ImobziLeasesService,
    ImobziInvoicesService,
  ],
})
export class ImobziModule {}
