import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { UpdatesRepository } from './updates.repository';
import { UpdatesService } from './updates.service';

describe('UpdatesService', () => {
  let service: UpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatesService, UpdatesRepository, PrismaService],
    }).compile();

    service = module.get<UpdatesService>(UpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
