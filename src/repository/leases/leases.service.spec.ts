import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeasesService } from './leases.service';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';
import { UpdateLeaseDTO } from './dtos/update-lease.dtos';

const leasesOnDbMock: Partial<Lease[]> = [
  {
    code_imobzi: '1234',
    duration: 30,
    fee: 100,
    guarantee_type: '',
    guarantee_value: 3000,
    id_annual_readjustment_imobzi: '',
    id_imobzi: 'cde',
    id_property_imobzi: '',
    include_in_dimob: true,
    indeterminate: true,
    irrf: true,
    lease_value: 3000,
    start_at: new Date('2023-01-01'),
    status: '',
    id_main_guarantor_imobzi: '',
    id_tenant_organization_imobzi: '',
    id_tenant_person_imobzi: '',
  },
  {
    code_imobzi: '1234',
    duration: 30,
    fee: 100,
    guarantee_type: '',
    guarantee_value: 3000,
    id_annual_readjustment_imobzi: '',
    id_imobzi: 'cde',
    id_property_imobzi: '',
    include_in_dimob: true,
    indeterminate: true,
    irrf: true,
    lease_value: 3000,
    start_at: new Date('2023-01-01'),
    status: '',
    id_main_guarantor_imobzi: '',
    id_tenant_organization_imobzi: '',
    id_tenant_person_imobzi: '',
  },
];

const existsLease: CreateLeaseDTO = {
  beneficiaries: [{ share: 100, id_beneficiary_organization_imobzi: '987', id_beneficiary_person_imobzi: null }],
  code_imobzi: '1234',
  duration: 30,
  fee: 100,
  guarantee_type: '',
  guarantee_value: 3000,
  id_annual_readjustment_imobzi: '',
  id_imobzi: 'cde',
  id_property_imobzi: '',
  include_in_dimob: true,
  indeterminate: true,
  irrf: true,
  lease_items: [
    {
      behavior: '',
      description: '',
      due_date: new Date('2023-02-01'),
      include_in_dimob: true,
      management_fee: true,
      recurrent: true,
      repeat_index: 1,
      until_due_date: true,
      value: 100,
      repeat_total: 2,
    },
  ],
  lease_value: 3000,
  start_at: new Date('2023-01-01'),
  status: '',
  id_main_guarantor_imobzi: '',
  id_tenant_organization_imobzi: '',
  id_tenant_person_imobzi: '',
};

const newLease: CreateLeaseDTO = {
  beneficiaries: [{ share: 100, id_beneficiary_organization_imobzi: '123', id_beneficiary_person_imobzi: null }],
  code_imobzi: '98765',
  duration: 30,
  fee: 100,
  guarantee_type: '',
  guarantee_value: 3000,
  id_annual_readjustment_imobzi: '',
  id_imobzi: 'abc',
  id_property_imobzi: '',
  include_in_dimob: true,
  indeterminate: true,
  irrf: true,
  lease_items: [
    {
      behavior: '',
      description: '',
      due_date: new Date('2023-02-01'),
      include_in_dimob: true,
      management_fee: true,
      recurrent: true,
      repeat_index: 1,
      until_due_date: true,
      value: 100,
      repeat_total: 2,
    },
  ],
  lease_value: 3000,
  start_at: new Date('2023-01-01'),
  status: '',
  id_main_guarantor_imobzi: '',
  id_tenant_organization_imobzi: '',
  id_tenant_person_imobzi: '',
};

describe('LeasesService', () => {
  let service: LeasesService;
  let prismaMock: {
    lease: {
      findFirst: jest.Mock;
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      upsert: jest.Mock;
      $queryRaw: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaMock = {
      lease: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
        $queryRaw: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasesService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('service.create > should throw error if lease already exists', async () => {
    prismaMock.lease.findFirst.mockResolvedValue({});
    try {
      await service.create(existsLease);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.create > should create a new lease and return it', async () => {
    prismaMock.lease.create.mockResolvedValue(newLease);
    const result = await service.create(newLease);
    expect(result).toBe(newLease);
  });

  test('service.findAll > should call prisma.findAll()', async () => {
    prismaMock.lease.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prismaMock.lease.findMany).toHaveBeenCalled();
  });

  test('service.findById > should call prisma findUnique', async () => {
    prismaMock.lease.findUnique.mockResolvedValue({});
    await service.findById('abc');
    expect(prismaMock.lease.findUnique).toHaveBeenCalled();
  });

  test('service.update > should throw error if lease do not exists', async () => {
    prismaMock.lease.findFirst.mockResolvedValue(null);
    try {
      await service.update(existsLease.id_imobzi, existsLease);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.update > should update lease and return it', async () => {
    const updatedLease: UpdateLeaseDTO = {
      ...leasesOnDbMock[0],
    };
    updatedLease.lease_value = 4000;

    prismaMock.lease.findFirst.mockResolvedValue(leasesOnDbMock[0]);
    prismaMock.lease.update.mockResolvedValue(updatedLease);

    const result = await service.update(existsLease.id_imobzi, updatedLease);
    expect(result).toEqual(updatedLease);
  });
});
