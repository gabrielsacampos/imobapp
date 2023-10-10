import { Module } from '@nestjs/common';
import { ImobziController } from './imobzi.controllers';
import { ImobziService } from './imobzi.service';
import { ImobziContactsService } from './imobzi-contacts/imobziContacts.service';
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

@Module({
  imports: [
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
