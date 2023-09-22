import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { OrganizationDTO } from './imobziOrganizations.dtos';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';

const organizationMock: OrganizationDTO = {
  db_id: 12345123451244,
  email: 'thisCompany@mymail.com',
  name: 'This Company', //sometimes API returns as BigInt > we need to convert it to string;
  fields: {
    group_company_data: [[{}, {}, {}, {}, { value: '11.111.111/0001-11' }]],
    group_address: [[{ value: 'some address' }]],
  },
  persons: [
    // third-party-api uses 'persons' instead of 'people'
    {
      associate_type: 'Legal',
      person_id: 11111111111,
    },
  ], //here is bigInt again

  phone: { number: '(11) 0000-0000' },
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

  test('getOrgsMainDataFromImobzi', async () => {
    const result = await imobziOrganizationsProvider.getOrgMainDataFromImobzi(12345123451244);
    expect(result).toEqual({
      address: 'some address',
      cnpj: '11.111.111/0001-11',
      person_id_representative: 11111111111,
      representative_type: 'Legal',
      phone: '(11) 0000-0000',
      id: 12345123451244,
      email: 'thisCompany@mymail.com',
      name: 'This Company',
    });
  });
});
