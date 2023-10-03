import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { imobziLeaseMock, imobziLeasesMock } from './imobziLease.mock';
import { ImobziLeasesService } from './imobziLeases.service';

describe('ImobziLeasesService', () => {
  let imobziLeasesService: ImobziLeasesService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        ImobziLeasesService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziLeasesService = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      const urlToUniqueLease = /^https:\/\/api\.imobzi\.app\/v1\/lease\//.test(url);
      if (urlToUniqueLease) {
        const id = url.split('/').pop();
        if (id === imobziLeaseMock.db_id.toString()) {
          return Promise.resolve({ data: imobziLeaseMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/leases?cursor=':
          return Promise.resolve({ data: imobziLeasesMock.page1 });
        case 'https://api.imobzi.app/v1/leases?cursor=abc':
          return Promise.resolve({ data: imobziLeasesMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllLeasesFromImobzi', async () => {
    const result = await imobziLeasesService.getAllLeasesFromImobzi();
    expect(result).toEqual([...imobziLeasesMock.page1.leases, ...imobziLeasesMock.page2.leases]);
  });

  test('getRequiredLeaseBeneficiariesDataToDb', () => {
    const result = imobziLeasesService.getRequiredLeaseBeneficiariesDataToDb(imobziLeaseMock.beneficiaries);
    expect(result).toEqual([
      {
        id_beneficiary_organization_imobzi: null,
        id_beneficiary_person_imobzi: '11111111111',
        share: 50,
      },
      {
        id_beneficiary_organization_imobzi: '22222222222',
        id_beneficiary_person_imobzi: null,
        share: 50,
      },
    ]);
  });

  test('getRequiredLeaseItemsDataToDb', () => {
    const result = imobziLeasesService.getRequiredLeaseItemsDataToDb(imobziLeaseMock.items);
    expect(result).toEqual([
      {
        due_date: '2023-08-27',
        repeat_total: 11,
        repeat_index: 2,
        description: 'Seguro Incêndio',
        management_fee: false,
        recurrent: true,
        value: 11.63,
        until_due_date: false,
        behavior: 'charge_tenant',
        include_in_dimob: false,
        start_date: '',
      },
      {
        due_date: '2023-08-27',
        repeat_total: 10,
        repeat_index: 9,
        description: 'IPTU',
        management_fee: false,
        recurrent: true,
        value: 85.69,
        until_due_date: false,
        behavior: 'charge_tenant_and_onlend',
        include_in_dimob: false,
        start_date: '',
      },
    ]);
  });

  test('getRequiredLeaseDataToDb', async () => {
    const result = await imobziLeasesService.getRequiredLeaseDataToDb('11111111');
    expect(result).toEqual({
      beneficiaries: [
        {
          id_beneficiary_organization_imobzi: null,
          id_beneficiary_person_imobzi: '11111111111',
          share: 50,
        },
        {
          id_beneficiary_organization_imobzi: '22222222222',
          id_beneficiary_person_imobzi: null,
          share: 50,
        },
      ],
      updated_at: new Date('2023-01-01T00:00:00.000Z'),
      id_annual_readjustment_imobzi: '999999999',
      code_imobzi: '44',
      duration: 30,
      fee: 15,
      guarantee_type: 'guarantor',
      guarantee_value: 3000,
      id_imobzi: '11111111',
      id_tenant_organization_imobzi: null,
      id_main_guarantor_imobzi: '4444444',
      id_tenant_person_imobzi: '555555',
      include_in_dimob: true,
      indeterminate: true,
      irrf: true,
      lease_value: undefined,
      id_property_imobzi: '3333333',
      start_at: '2023-01-01',
      status: 'active',
      lease_items: [
        {
          due_date: '2023-08-27',
          repeat_total: 11,
          repeat_index: 2,
          description: 'Seguro Incêndio',
          management_fee: false,
          recurrent: true,
          value: 11.63,
          until_due_date: false,
          behavior: 'charge_tenant',
          include_in_dimob: false,
          start_date: '',
        },
        {
          due_date: '2023-08-27',
          repeat_total: 10,
          repeat_index: 9,
          description: 'IPTU',
          management_fee: false,
          recurrent: true,
          value: 85.69,
          until_due_date: false,
          behavior: 'charge_tenant_and_onlend',
          include_in_dimob: false,
          start_date: '',
        },
      ],
    });
  });
});
