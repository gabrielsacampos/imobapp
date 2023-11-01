import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryLeasesRepository } from '../../../test/repositories/inMemoryLeasesRepository/inMemoryLeasesRepository';
import { inMemoryLeasesRepositoryMock } from '../../../test/repositories/inMemoryLeasesRepository/inMemoryLeasesRepository.mock';
import { LeasesController } from './leases.controller';
import { LeasesRepository } from './leases.repository';
import { LeasesService } from './leases.service';

describe('LeasesController', () => {
  let controller: LeasesController;
  let repository: InMemoryLeasesRepository;

  beforeEach(async () => {
    repository = new InMemoryLeasesRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeasesController],
      providers: [LeasesService, { provide: LeasesRepository, useValue: repository }],
    }).compile();

    controller = module.get<LeasesController>(LeasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined and call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create({ ...inMemoryLeasesRepositoryMock[0], beneficiaries: [], lease_items: [] });
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call upsert function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    await controller.upsert({ ...inMemoryLeasesRepositoryMock[0], beneficiaries: [], lease_items: [] });
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
