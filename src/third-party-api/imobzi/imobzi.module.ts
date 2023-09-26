import { Module } from '@nestjs/common';
import { ImobziContactsModule } from 'src/third-party-api/imobzi/imobzi-contacts/imobziContacts.module';
import { ImobziInvoicesModule } from './imobzi-invoices/imobziInvoices.module';
import { ImobziLeasesModule } from './imobzi-leases/imobziLeases.module';
import { ImobziOrganizationsModule } from './imobzi-organizations/imobziOrganizations.module';
import { ImobziPeopleModule } from './imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from './imobzi-properties/imobziProperties.module';
import { ImobziController } from './imobzi.controllers';
import { ImobziService } from './imobzi.service';

@Module({
  imports: [
    ImobziContactsModule,
    ImobziPeopleModule,
    ImobziOrganizationsModule,
    ImobziPropertiesModule,
    ImobziLeasesModule,
    ImobziInvoicesModule,
  ],
  controllers: [ImobziController],
  providers: [ImobziService],
})
export class ImobziModule {}
