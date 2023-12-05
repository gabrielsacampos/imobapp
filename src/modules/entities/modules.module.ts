import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LeasesModule } from './leases/leases.module';
import { ModulesServices } from './modules.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { PeopleModule } from './people/people.module';
import { PropertiesModule } from './properties/properties.module';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    PeopleModule,
    OrganizationsModule,
    PropertiesModule,
    BuildingsModule,
    LeasesModule,
    InvoicesModule,
    UpdatesModule,
  ],
  providers: [ModulesServices],
  exports: [
    ModulesServices,
    PeopleModule,
    OrganizationsModule,
    PropertiesModule,
    BuildingsModule,
    LeasesModule,
    InvoicesModule,
    UpdatesModule,
  ],
})
export class ModulesModule {}
