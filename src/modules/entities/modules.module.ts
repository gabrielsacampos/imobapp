import { Module } from '@nestjs/common';
import { FinancesModule } from '../BFF/finances/finances.modules';
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
    FinancesModule,
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
    FinancesModule,
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
