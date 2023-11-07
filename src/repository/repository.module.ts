import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { BuildingsService } from './buildings/buildings.service';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesService } from './invoices/invoices.service';
import { LeasesModule } from './leases/leases.module';
import { LeasesService } from './leases/leases.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { OrganizationsService } from './organizations/organizations.service';
import { PeopleModule } from './people/people.module';
import { PeopleService } from './people/people.service';
import { PropertiesModule } from './properties/properties.module';
import { PropertiesService } from './properties/properties.service';
import { RepositoryService } from './repository.service';

@Module({
  imports: [PeopleModule, OrganizationsModule, PropertiesModule, BuildingsModule, LeasesModule, InvoicesModule],
  providers: [
    PeopleService,
    OrganizationsService,
    PropertiesService,
    BuildingsService,
    LeasesService,
    InvoicesService,
    RepositoryService,
  ],
  exports: [
    PeopleModule,
    OrganizationsModule,
    PropertiesModule,
    BuildingsModule,
    LeasesModule,
    InvoicesModule,
    RepositoryService,
  ],
})
export class RepositoryModule {}
