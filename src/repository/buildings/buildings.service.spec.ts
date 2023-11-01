import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { BuildingsService } from './buildings.service';

describe('BuildingsService', () => {
  let service: BuildingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingsService, PrismaService],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
