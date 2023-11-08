import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LeasesModule } from './leases/leases.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PeopleModule } from './people/people.module';
import { PropertiesModule } from './properties/properties.module';
import { RepositoryService } from './repository.service';

@Module({
  imports: [PeopleModule, OrganizationsModule, PropertiesModule, BuildingsModule, LeasesModule, InvoicesModule],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
