import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesService, PrismaService],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
