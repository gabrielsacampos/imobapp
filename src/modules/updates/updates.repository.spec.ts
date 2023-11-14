import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { UpdatesRepository } from './updates.repository';

describe('UpdatesRepository', () => {
  let service: UpdatesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatesRepository, PrismaService],
    }).compile();

    service = module.get<UpdatesRepository>(UpdatesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
