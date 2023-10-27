import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { ImobziContactsModule } from 'src/imobzi/imobzi-contacts/imobziContacts.module';
import { ImobziPeopleModule } from 'src/imobzi/imobzi-people/imobziPeople.module';
import { ImobziPropertiesModule } from 'src/imobzi/imobzi-properties/imobziProperties.module';
import { ImobziLeasesModule } from 'src/imobzi/imobzi-leases/imobziLeases.module';
import { ImobziInvoicesModule } from 'src/imobzi/imobzi-invoices/imobziInvoices.module';
import { ImobziOrganizationsModule } from 'src/imobzi/imobzi-organizations/imobziOrganizations.module';

@Module({
  imports: [
    ImobziPeopleModule,
    ImobziOrganizationsModule,
    ImobziContactsModule,
    ImobziPropertiesModule,
    ImobziLeasesModule,
    ImobziInvoicesModule,
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, PrismaService],
})
export class WebhooksModule {}
