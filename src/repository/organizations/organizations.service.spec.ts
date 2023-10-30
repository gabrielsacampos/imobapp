import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';
import { UpdateOrganizationDTO } from './dtos/update-organization.dtos';

const organizationsOnDbMock: Partial<Organization[]> = [
  {
    cnpj: '1232434-09',
    email: 'someemail@gmail.com',
    id_imobzi: '1234',
    id_person_representative: '9876554',
    name: 'The Company',
    phone: '21 00987-9876',
    representative_type: 'Adm',
    address: 'The street',
  },
  {
    cnpj: '1232542-09',
    email: 'onemail@gmail.com',
    id_imobzi: '10984',
    id_person_representative: '91236554',
    name: 'The Co.',
    phone: '21 00222-9876',
    representative_type: 'Adm',
    address: 'Avenue',
  },
];

const existsOrganization: CreateOrganizationDTO = {
  cnpj: '1232542-09',
  email: 'onemail@gmail.com',
  id_imobzi: '10984',
  id_person_representative: '91236554',
  name: 'The Co.',
  phone: '21 00222-9876',
  representative_type: 'Adm',
  address: 'Avenue',
};

const newOrganization: CreateOrganizationDTO = {
  cnpj: '123999-09',
  email: 'otheronw@gmail.com',
  id_imobzi: '10984',
  id_person_representative: '91236554',
  name: 'The Other.',
  phone: '21 00222-1176',
  representative_type: 'Adm',
  address: 'Avenue',
};

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let prismaMock: {
    organization: {
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
      organization: {
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
      providers: [OrganizationsService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('service.create > should throw error if organization already exists', async () => {
    prismaMock.organization.findFirst.mockResolvedValue({});
    try {
      await service.create(existsOrganization);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.create > should create a new organization and return it', async () => {
    prismaMock.organization.create.mockResolvedValue(newOrganization);
    const result = await service.create(newOrganization);
    expect(result).toBe(newOrganization);
  });

  test('service.findAll > should call prisma.findAll()', async () => {
    prismaMock.organization.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prismaMock.organization.findMany).toHaveBeenCalled();
  });

  test('service.findById > should call prisma findUnique', async () => {
    prismaMock.organization.findUnique.mockResolvedValue({});
    await service.findById('abc');
    expect(prismaMock.organization.findUnique).toHaveBeenCalled();
  });

  test('service.update > should throw error if organization do not exists', async () => {
    prismaMock.organization.findFirst.mockResolvedValue(null);
    try {
      await service.update(existsOrganization.id_imobzi, existsOrganization);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.update > should update organization and return it', async () => {
    const updatedOrganization: UpdateOrganizationDTO = {
      ...organizationsOnDbMock[0],
    };
    updatedOrganization.email = 'newemail@gmail.com';

    prismaMock.organization.findFirst.mockResolvedValue(organizationsOnDbMock[0]);
    prismaMock.organization.update.mockResolvedValue(updatedOrganization);

    const result = await service.update(existsOrganization.id_imobzi, updatedOrganization);
    expect(result).toEqual(updatedOrganization);
  });
});
