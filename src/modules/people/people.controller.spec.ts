import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { inMemoryPeopleRepositoryMock } from '../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';
import { InMemoryPeopleRepository } from '../../test/server-repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
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

  it('should be defined and call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create(inMemoryPeopleRepositoryMock[0]);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call update function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'update');
    spy.mockResolvedValue(true as any);

    const personTest = inMemoryPeopleRepositoryMock[0];
    //call
    await controller.update(personTest.id_imobzi, personTest);
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
