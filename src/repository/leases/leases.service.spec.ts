import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
  let service: LeasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasesService, PrismaService],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
