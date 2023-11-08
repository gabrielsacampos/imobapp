import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { ImobziOrganizationsMock } from '../../../test/3rdParty-repositories/imobzi-repositories/organizations/imobziOrganizations.mock';
import { ImobziOrganizationDTO } from './dtos/imobziOrganizations.dtos';
import { ImobziOrganizationsRepository } from './imobziOrganizations.reposiotry';

describe('ImobziOrganizationsRepository', () => {
  let repository: ImobziOrganizationsRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let organizationsMock: ImobziOrganizationsMock;

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };
    organizationsMock = new ImobziOrganizationsMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziOrganizationsRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = moduleRef.get<ImobziOrganizationsRepository>(ImobziOrganizationsRepository);
  });

  test('reposiotry should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getRequiredOrganizationDataToDb', async () => {
    const orgs = organizationsMock.allOrganizationsFullData;
    const orgTest = orgs[0];
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === orgTest.db_id.toString()) {
        return Promise.resolve({ data: orgTest });
      } else {
        return Promise.reject(`id ${id} not found at organiations`);
      }
    });
    const result: ImobziOrganizationDTO = await repository.getFullData(orgTest.db_id.toString());
    expect(result).toEqual(orgTest);
  });
});
