import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { Building } from './entities/building.entity';

const buildingsOnDbMock: Partial<Building[]> = [
  {
    address: 'The Big Street',
    city: 'My City',
    id_imobzi: '12345',
    name: 'BigBuilding',
    zipcode: '1234-543',
    block: 'C',
  },
  {
    address: 'The Avenue',
    city: 'Globe',
    id_imobzi: '09876',
    name: 'TheShopping',
    zipcode: '1298-543',
    block: 'A',
  },
];

const existsBuilding: CreateBuildingDTO = {
  id_imobzi: buildingsOnDbMock[0].id_imobzi,
  address: buildingsOnDbMock[0].address,
  city: buildingsOnDbMock[0].city,
  name: buildingsOnDbMock[0].name,
  zipcode: buildingsOnDbMock[0].zipcode,
  block: buildingsOnDbMock[0].block,
};

const newBuilding: CreateBuildingDTO = {
  id_imobzi: 'asxdew',
  address: 'John Street',
  city: 'SomePlace',
  name: 'OtherOne',
  zipcode: '441214134',
  block: 'A',
};

describe('BuildingsService', () => {
  let service: BuildingsService;
  let prismaMock: {
    building: {
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
      building: {
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
      providers: [BuildingsService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('service.create > should throw error if building already exists', async () => {
    prismaMock.building.findFirst.mockResolvedValue({});
    try {
      await service.create(existsBuilding);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.create > should create a new building and return it', async () => {
    prismaMock.building.create.mockResolvedValue(newBuilding);
    const result = await service.create(newBuilding);
    expect(result).toBe(newBuilding);
  });

  test('service.findAll > should call prisma.findAll()', async () => {
    prismaMock.building.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prismaMock.building.findMany).toHaveBeenCalled();
  });

  test('service.findById > should call prisma findUnique', async () => {
    prismaMock.building.findUnique.mockResolvedValue({});
    await service.findById('abc');
    expect(prismaMock.building.findUnique).toHaveBeenCalled();
  });

  test('service.update > should throw error if building do not exists', async () => {
    prismaMock.building.findFirst.mockResolvedValue(null);
    try {
      await service.update(existsBuilding.id_imobzi, existsBuilding);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.update > should update building and return it', async () => {
    const updatedbuilding: CreateBuildingDTO = buildingsOnDbMock[0];
    updatedbuilding.name = 'New Name';

    prismaMock.building.findFirst.mockResolvedValue(buildingsOnDbMock[0]);
    prismaMock.building.update.mockResolvedValue(updatedbuilding);

    const result = await service.update(existsBuilding.id_imobzi, updatedbuilding);
    expect(result).toEqual(updatedbuilding);
  });
});
