import { Test, TestingModule } from '@nestjs/testing';
import { inMemoryPropertiesRepositoryMock } from '../../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository.mock';
import { InMemoryPropertiesRepository } from '../../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository';
import { PropertiesController } from './properties.controller';
import { PropertiesRepository } from './properties.repository';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let repository: InMemoryPropertiesRepository;

  beforeEach(async () => {
    repository = new InMemoryPropertiesRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [{ provide: PropertiesRepository, useValue: repository }],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined and call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create({ ...inMemoryPropertiesRepositoryMock[0], owners: [] });
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call upsert function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    await controller.upsert({ ...inMemoryPropertiesRepositoryMock[0], owners: [] });
    expect(repository.upsert).toHaveBeenCalled();
  });

  it('should be defined and call function  ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(repository.findAll).toHaveBeenCalled();
  });
});
