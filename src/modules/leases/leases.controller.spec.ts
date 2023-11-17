import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryLeasesRepository } from '../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository';
import { inMemoryLeasesRepositoryMock } from '../../test/server-repositories/inMemoryLeasesRepository/inMemoryLeasesRepository.mock';
import { LeaseItemsModule } from '../lease-items/lease-items.module';
import { LeasesController } from './leases.controller';
import { LeasesRepository } from './leases.repository';
import { LeasesService } from './leases.service';

describe('LeasesController', () => {
  let controller: LeasesController;
  let repository: InMemoryLeasesRepository;

  beforeEach(async () => {
    repository = new InMemoryLeasesRepository();
    const module: TestingModule = await Test.createTestingModule({
      imports: [LeaseItemsModule],
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
    await controller.create({ ...inMemoryLeasesRepositoryMock[0], beneficiariesLease: [], leaseItems: [] });
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call update function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'update');
    spy.mockResolvedValue(true as any);

    const leaseTest = inMemoryLeasesRepositoryMock[0];
    //call
    await controller.update(leaseTest.id_imobzi, leaseTest);
    expect(repository.update).toHaveBeenCalled();
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
