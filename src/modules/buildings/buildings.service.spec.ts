import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryBuildingsRepository } from '../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository';
import { inMemoryBuildingsRepositoryMock } from '../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository.mock';
import { BuildingsRepository } from './buildings.repository';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDTO } from './dtos/create-building.dtos';

describe('BuildingsService', () => {
  let service: BuildingsService;
  let inMemoryBuildingsRepository: InMemoryBuildingsRepository;
  beforeEach(async () => {
    inMemoryBuildingsRepository = new InMemoryBuildingsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingsService, { provide: BuildingsRepository, useValue: inMemoryBuildingsRepository }],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update building when it exists', async () => {
    const buildingTest: CreateBuildingDTO = inMemoryBuildingsRepositoryMock[0];
    buildingTest.name = 'new name';
    const result = await service.upsert(buildingTest);
    const updatedBuilding = inMemoryBuildingsRepositoryMock.find((building) => {
      return building.id_imobzi === buildingTest.id_imobzi;
    });
    expect(result).toEqual(updatedBuilding);
    expect(result.name).toBe('new name');
  });

  it('upsert > should create building when it NOT exists', async () => {
    const buildingTest: CreateBuildingDTO = { ...inMemoryBuildingsRepositoryMock[0] };
    buildingTest.id = 9898;
    const result = await service.upsert(buildingTest);
    const updatedBuilding = inMemoryBuildingsRepositoryMock.find((building) => {
      return building.id_imobzi === buildingTest.id_imobzi;
    });
    expect(result).toEqual(updatedBuilding);
    expect(result.id).toBe(9898);
  });
});
