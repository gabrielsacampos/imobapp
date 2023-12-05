import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryBuildingsRepository } from '../../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository';
import { inMemoryBuildingsRepositoryMock } from '../../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository.mock';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDTO } from './dtos/create-building.dtos';

describe('BuildingsRepository', () => {
  let repository: BuildingsRepository;
  let inMemoryBuildingsRepository: InMemoryBuildingsRepository;

  beforeEach(async () => {
    inMemoryBuildingsRepository = new InMemoryBuildingsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: BuildingsRepository, useValue: inMemoryBuildingsRepository }],
    }).compile();

    repository = module.get<BuildingsRepository>(BuildingsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll > should return array of buildings', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryBuildingsRepositoryMock);
  });

  it('findUnique > existgin id_imobzi should return a building', async () => {
    const randomBuildigToTest = inMemoryBuildingsRepositoryMock[4];
    const randomPersonId = randomBuildigToTest.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const building = inMemoryBuildingsRepositoryMock.find((building) => building.id_imobzi === randomPersonId);
    expect(result).toBe(building);
  });

  it('findUnique > NOT existing id_imobzi should NOT return a building', async () => {
    await expect(repository.findById('xx')).rejects.toThrow();
  });

  it('create > existing id_imobzi || cpf should NOT create a building', async () => {
    const randomBuildigToTest = inMemoryBuildingsRepositoryMock[4];

    await expect(repository.create(randomBuildigToTest)).rejects.toThrow();
  });

  it('create > should create and return the new building', async () => {
    const newBuilding: CreateBuildingDTO = {
      id_imobzi: '',
      name: '',
      address: '',
      city: '',
      zipcode: '',
    };

    await expect(repository.create(newBuilding)).resolves.not.toThrow();
    expect(inMemoryBuildingsRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newBuilding)]));
  });

  it('update > create building or update if not exists', async () => {
    const randomBuildigToTest = inMemoryBuildingsRepositoryMock[4];
    randomBuildigToTest.city = 'Caruaru';
    await expect(repository.update(randomBuildigToTest.id_imobzi, randomBuildigToTest)).resolves.not.toThrow();
    expect(inMemoryBuildingsRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomBuildigToTest)]),
    );
  });
});
