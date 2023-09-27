import { Test, TestingModule } from '@nestjs/testing';
import { ImobziOrganizationDTO } from './imobziOrganizations.dtos';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

const orgFullDataFromImobziMock: ImobziOrganizationDTO = {
  db_id: 12345123451244,
  email: 'thisCompany@mymail.com',
  name: 'This Company', //sometimes API returns as BigInt > we need to convert it to string;
  fields: {
    group_company_data: [[{}, {}, {}, {}, { field_id: 'cnpj', value: '11.111.111/0001-11' }]],
    group_address: [[{ field_id: 'address', value: 'some address' }]],
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

describe('ImobziOrganizationsService', () => {
  let imobziOrganizationsService: ImobziOrganizationsService;
  let imobziOrganizationsProviderMock: { getOrgFullDataFromImobzi: jest.Mock };

  beforeEach(async () => {
    imobziOrganizationsProviderMock = { getOrgFullDataFromImobzi: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziOrganizationsService,
        { provide: ImobziOrganizationsProvider, useValue: imobziOrganizationsProviderMock },
      ],
    }).compile();

    imobziOrganizationsService = moduleRef.get<ImobziOrganizationsService>(ImobziOrganizationsService);

    imobziOrganizationsProviderMock.getOrgFullDataFromImobzi.mockResolvedValue(orgFullDataFromImobziMock);
  });

  test('getOrgDataToDb', async () => {
    const result = await imobziOrganizationsService.formatOrgDataToDb(1234);
    expect(result).toEqual({
      address: 'some address',
      cnpj: '11.111.111/0001-11',
      person_id_representative: 11111111111,
      representative_type: 'Legal',
      phone: '(11) 0000-0000',
      id_imobzi: '12345123451244',
      email: 'thisCompany@mymail.com',
      name: 'This Company',
    });
  });
});
