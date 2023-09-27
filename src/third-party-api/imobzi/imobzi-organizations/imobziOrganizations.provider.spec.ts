import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';

const organizationMock = {
  db_id: 12345123451244,
};

describe('ImobziOrganizationsProvider', () => {
  let imobziOrganizationsProvider: ImobziOrganizationsProvider;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziParamService,
        ImobziUrlService,
        ImobziOrganizationsProvider,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziOrganizationsProvider = moduleRef.get<ImobziOrganizationsProvider>(ImobziOrganizationsProvider);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === organizationMock.db_id.toString()) {
        return Promise.resolve({ data: organizationMock });
      } else {
        return Promise.reject(`id ${id} not found at organiations`);
      }
    });
  });

  test('getOrgFullDataFromImobzi', async () => {
    const result = await imobziOrganizationsProvider.getOrgFullDataFromImobzi(12345123451244);
    expect(result).toEqual(organizationMock);
  });
});
