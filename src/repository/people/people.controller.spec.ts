import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { inMemoryPeopleRepositoryMock } from '../../../test/repositories/inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';
import { InMemoryPeopleRepository } from '../../../test/repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
import { PeopleController } from './people.controller';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;
  let repository: InMemoryPeopleRepository;

  beforeEach(async () => {
    repository = new InMemoryPeopleRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleRepository, useValue: repository }, PeopleService, PrismaService],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create(inMemoryPeopleRepositoryMock[0]);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should call upsert function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    await controller.upsert(inMemoryPeopleRepositoryMock[0]);
    expect(repository.upsert).toHaveBeenCalled();
  });

  it('should call function  ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(repository.findAll).toHaveBeenCalled();
  });
});
