import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LeasesModule } from './modules/leases/leases.module';
import { LeaseItemsModule } from './modules/leases/lease-items/lease-items.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { InvoiceItemsModule } from './modules/invoices/invoice-items/invoice-items.module';
import { ImobziModule } from './third-party-api/imobzi/imobzi.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PeopleModule,
    OrganizationsModule,
    BuildingsModule,
    PropertiesModule,
    LeasesModule,
    LeaseItemsModule,
    InvoicesModule,
    InvoiceItemsModule,
    ImobziModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
