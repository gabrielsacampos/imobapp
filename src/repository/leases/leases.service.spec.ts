import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeasesRepository } from './leases.repository';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
  let service: LeasesService;

  beforeEach(async () => {
    service = LeasesService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasesService, LeasesRepository, PrismaService],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
