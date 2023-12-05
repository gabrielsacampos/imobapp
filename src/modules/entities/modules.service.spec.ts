import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { BuildingsModule } from './buildings/buildings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LeasesModule } from './leases/leases.module';
import { ModulesServices } from './modules.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { PeopleModule } from './people/people.module';
import { PropertiesModule } from './properties/properties.module';
import { UpdatesModule } from './updates/updates.module';

describe('ModulesServices', () => {
  let service: ModulesServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PeopleModule,
        OrganizationsModule,
        PropertiesModule,
        BuildingsModule,
        LeasesModule,
        InvoicesModule,
        UpdatesModule,
      ],
      providers: [ModulesServices, PrismaService],
    }).compile();

    service = module.get<ModulesServices>(ModulesServices);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
