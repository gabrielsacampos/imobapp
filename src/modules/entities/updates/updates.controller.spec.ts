import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { UpdatesController } from './updates.controller';
import { UpdatesRepository } from './updates.repository';
import { UpdatesService } from './updates.service';

describe('UpdatesController', () => {
  let controller: UpdatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatesController],
      providers: [UpdatesService, UpdatesRepository, PrismaService],
    }).compile();

    controller = module.get<UpdatesController>(UpdatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
