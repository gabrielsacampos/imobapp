import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrganizationDTO } from 'src/repository/organizations/dtos/create-organization.dtos';
import { SharedModule } from 'src/shared.module';
import { ImobziOrganizationsMock } from '../../../test/3rdParty-repositories/imobzi-repositories/organizations/imobziOrganizations.mock';
import { ImobziOrganizationsRepository } from './imobziOrganizations.reposiotry';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

describe('ImobziOrganizationsService', () => {
  let service: ImobziOrganizationsService;
  let organizationsMock: ImobziOrganizationsMock;

  beforeEach(async () => {
    organizationsMock = new ImobziOrganizationsMock();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziOrganizationsService, { provide: ImobziOrganizationsRepository, useValue: organizationsMock }],
    }).compile();

    service = moduleRef.get<ImobziOrganizationsService>(ImobziOrganizationsService);
  });

  test('reposiotry should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getRequiredOrganizationDataToDb should return organization main data to store into db', async () => {
    const organizations = organizationsMock.allOrganizationsFullData;
    const orgTest = organizations[0];
    const result: CreateOrganizationDTO = await service.getRequiredData(orgTest.db_id.toString());
    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });
});
