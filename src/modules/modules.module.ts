import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LeasesModule } from './leases/leases.module';
import { ModulesServices } from './modules.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { PeopleModule } from './people/people.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [PeopleModule, OrganizationsModule, PropertiesModule, BuildingsModule, LeasesModule, InvoicesModule],
  providers: [ModulesServices],
  exports: [
    ModulesServices,
    PeopleModule,
    OrganizationsModule,
    PropertiesModule,
    BuildingsModule,
    LeasesModule,
    InvoicesModule,
  ],
})
export class ModulesModule {}
