import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { BuildingsService } from './buildings.service';

describe('BuildingsService', () => {
  let service: BuildingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingsService, PrismaService],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
