import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryBuildingsRepository } from '../../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository';
import { inMemoryBuildingsRepositoryMock } from '../../../test/server-repositories/inMemoryBuildingsRepository/inMemoryBuildingsRepository.mock';
import { BuildingsController } from './buildings.controller';
import { BuildingsRepository } from './buildings.repository';
import { BuildingsService } from './buildings.service';

describe('BuildingsController', () => {
  let controller: BuildingsController;
  let repository: InMemoryBuildingsRepository;

  beforeEach(async () => {
    repository = new InMemoryBuildingsRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingsController],
      providers: [BuildingsService, { provide: BuildingsRepository, useValue: repository }],
    }).compile();

    controller = module.get<BuildingsController>(BuildingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined and call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create(inMemoryBuildingsRepositoryMock[0]);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call upsert function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    const building = inMemoryBuildingsRepositoryMock[0];
    await controller.upsert(building.id_imobzi, building);
    expect(repository.upsert).toHaveBeenCalled();
  });

  it('should be defined and call findAll function  ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(repository.findAll).toHaveBeenCalled();
  });
});
