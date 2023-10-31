import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InMemoryOrganizationsRepository } from '../../../test/repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository';
import { inMemoryOrganizationsRepositoryMock } from '../../../test/repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository.mock';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let organizationsRepository: InMemoryOrganizationsRepository;

  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [{ provide: OrganizationsRepository, useValue: organizationsRepository }, PrismaService],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create function ', async () => {
    //mock
    const spy = jest.spyOn(organizationsRepository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create(inMemoryOrganizationsRepositoryMock[0]);
    expect(organizationsRepository.create).toHaveBeenCalled();
  });

  it('should call upsert function', async () => {
    //mock
    const spy = jest.spyOn(organizationsRepository, 'upsert');
    spy.mockResolvedValue(true as any);

    //call
    await controller.upsert(inMemoryOrganizationsRepositoryMock[0]);
    expect(organizationsRepository.upsert).toHaveBeenCalled();
  });

  it('should call function  ', async () => {
    //mock
    const spy = jest.spyOn(organizationsRepository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(organizationsRepository.findAll).toHaveBeenCalled();
  });
});
