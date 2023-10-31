import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LeasesModule } from './leases/leases.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PeopleModule } from './people/people.module';
import { PropertiesModule } from './properties/properties.module';
import { FailedQueueJobsModule } from './failed-queue-jobs/failed-queue-jobs.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    PeopleModule,
    OrganizationsModule,
    LeasesModule,
    PropertiesModule,
    BuildingsModule,
    InvoicesModule,
    FailedQueueJobsModule,
    OwnersModule,
  ],
  exports: [
    PeopleModule,
    OrganizationsModule,
    LeasesModule,
    PropertiesModule,
    BuildingsModule,
    InvoicesModule,
    FailedQueueJobsModule,
  ],
})
export class RepositoryModule {}
