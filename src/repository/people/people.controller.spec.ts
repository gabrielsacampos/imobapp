import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { inMemoryPeopleRepositoryMock } from '../../../test/repositories/inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';
import { InMemoryPeopleRepository } from '../../../test/repositories/inMemoryPeopleRepository/inMemoryPeopleRepository';
import { PeopleController } from './people.controller';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;
  let peopleRepository: InMemoryPeopleRepository;

  beforeEach(async () => {
    peopleRepository = new InMemoryPeopleRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleRepository, useValue: peopleRepository }, PeopleService, PrismaService],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create function ', async () => {
    //mock
    const spy = jest.spyOn(peopleRepository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create(inMemoryPeopleRepositoryMock[0]);
    expect(peopleRepository.create).toHaveBeenCalled();
  });

  it('should call upsert function', async () => {
    //mock
    const spy = jest.spyOn(peopleRepository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    await controller.upsert(inMemoryPeopleRepositoryMock[0]);
    expect(peopleRepository.upsert).toHaveBeenCalled();
  });

  it('should call function  ', async () => {
    //mock
    const spy = jest.spyOn(peopleRepository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(peopleRepository.findAll).toHaveBeenCalled();
  });
});
