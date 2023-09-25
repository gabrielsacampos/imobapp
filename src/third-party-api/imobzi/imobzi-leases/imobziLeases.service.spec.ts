import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziLeasesProvider } from './imobziLeases.provider';
import { ImobziLeasesService } from './imobziLeases.service';
import { ImobziLeaseDetailsDTO } from './imobziLeasesDetails.dtos';

const getAllLeasesFromImobziMock = [{ db_id: 11111111 }, { db_id: 22222222 }, { db_id: 33333333 }];

const leasesOnDbMock = [{ id_imobzi: '11111111', updated_at: '2020-01-01' }];

const getLeaseFullDataFromImobziMock: Partial<ImobziLeaseDetailsDTO> = {
  updated_at: '2023-01-01T00:00:00.000Z',
  duration: 30,
  start_at: '2023-01-01',
  indeterminate: true,
  irrf: true,
  include_in_dimob: true,
  status: 'active',
  code: '44',
  db_id: 11111111,
  annual_readjustment: { db_id: '999999999', name: 'IPCA' }, // here, imobzi's api returns db_id as string
  property: { db_id: 3333333 },
  guarantee: { guarantee_type: 'guarantor', details: { value: 3000 }, sponsor: { db_id: 4444444 } },
  tenants: [{ db_id: 555555, type: 'person' }],
  management_fee: { percent: 15 },
  beneficiaries: [
    { db_id: 8888888, type: 'person', percent: 50 },
    { db_id: 2222222, type: 'person', percent: 50 },
  ],
};

const filterLeasesMainDataToDbMock = {
  beneficiaries: [
    {
      id_lease_imobzi: '11111111',
      id_beneficiary_organization: null,
      id_beneficiary_person: '8888888',
      share: 50,
    },
    {
      id_lease_imobzi: '11111111',
      id_beneficiary_organization: null,
      id_beneficiary_person: '2222222',
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
};

describe('ImobziLeasesService', () => {
  let imobziLeasesService: ImobziLeasesService;
  let imobziLasesProviderMock: { getAllLeasesFromImobzi: jest.Mock; getLeaseFullDataFromImobzi: jest.Mock };
  let prismaMock: { lease: { findMany: jest.Mock } };

  beforeEach(async () => {
    imobziLasesProviderMock = {
      getAllLeasesFromImobzi: jest.fn(),
      getLeaseFullDataFromImobzi: jest.fn(),
    };
    prismaMock = { lease: { findMany: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziLeasesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: ImobziLeasesProvider,
          useValue: imobziLasesProviderMock,
        },
      ],
    }).compile();

    imobziLeasesService = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);

    imobziLeasesService = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);
    imobziLasesProviderMock.getAllLeasesFromImobzi.mockResolvedValue(getAllLeasesFromImobziMock);
    imobziLasesProviderMock.getLeaseFullDataFromImobzi.mockResolvedValue(getLeaseFullDataFromImobziMock);
    prismaMock.lease.findMany.mockResolvedValue(leasesOnDbMock);
  });

  test('getLeasesMissingIdsFromImobzi', async () => {
    const result = await imobziLeasesService.getLeasesMissingIdsFromImobzi(leasesOnDbMock);
    const expectedResult = ['22222222', '33333333'];
    expect(result).toEqual(expectedResult);
  });

  test('filterLeaseMainDataToDb', () => {
    const result = imobziLeasesService.filterLeaseMainDataToDb(getLeaseFullDataFromImobziMock);
    expect(result).toEqual(filterLeasesMainDataToDbMock);
  });

  test('getExistingLeasesIdsToUpdate', async () => {
    await imobziLeasesService.getLeasesToUpdateDb();
    expect(imobziLasesProviderMock.getLeaseFullDataFromImobzi).toHaveBeenCalled();
  });
});
