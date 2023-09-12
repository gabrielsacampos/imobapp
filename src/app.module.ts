import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LeasesModule } from './modules/leases/leases.module';
// import { OwnersModule } from './modules/owners/owners.module';
// import { TenantsModule } from './modules/tenants/tenants.module';
import { LeaseItemsModule } from './modules/leases/lease-items/lease-items.module';

@Module({
  imports: [
    PeopleModule,
    OrganizationsModule,
    BuildingsModule,
    PropertiesModule,
    LeasesModule,
    LeaseItemsModule,
    // OwnersModule,
    // TenantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
