import { Test, TestingModule } from '@nestjs/testing';
import { BuildingsRepository } from 'src/repository/buildings/buildings.repository';
import { InvoicesRepository } from 'src/repository/invoices/invoices.repository';
import { OrganizationsRepository } from 'src/repository/organizations/organizations.repository';
import { PeopleRepository } from 'src/repository/people/people.repository';
import { PropertiesRepository } from 'src/repository/properties/properties.repository';
import { InMemoryBuildingsRepository } from 'test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository';
import { inMemoryBuildingsRepositoryMock } from 'test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository.mock';
import { InMemoryInvoicesRepository } from 'test/server-repositories/inMemoryInvoicesRepository/inMemoryInvoicesRepository';
import { InMemoryOrganizationsRepository } from 'test/server-repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository';
import { InMemoryPeopleRepository } from 'test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
import { InMemoryPropertiesRepository } from 'test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository';
import { ImobziService } from './imobzi.service';

describe('ImobziService', () => {
  let service: ImobziService;
  let inMemoryPeopleRepository: InMemoryPeopleRepository;
  let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
  let inMemoryBuildingsRepository: InMemoryBuildingsRepository;
  let inMemoryInvoicesRepository: InMemoryInvoicesRepository;
  let inMemoryPropertiesRepository: InMemoryPropertiesRepository;
  let InvoicesRepository: InMemoryPro

  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPeopleRepository = new InMemoryPeopleRepository();
    inMemoryBuildingsRepository = new InMemoryBuildingsRepository();
    inMemoryInvoicesRepository = new InMemoryInvoicesRepository();
    inMemoryPropertiesRepository = new InMemoryPropertiesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziService,
        { provide: PeopleRepository, useValue: inMemoryPeopleRepository },
        { provide: OrganizationsRepository, useValue: inMemoryOrganizationsRepository },
        { provide: BuildingsRepository, useValue: inMemoryBuildingsRepository },
        { provide: PropertiesRepository, useValue: inMemoryPropertiesRepository },
        { provide: InvoicesRepository, useValue: inMemoryInvoicesRepository },
      ],
    }).compile();

    service = module.get<ImobziService>(ImobziService);
  });
});
