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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('', async () => {
    // const result = await service.getOnlendings('2023-07-01', '2023-07-30');
    // const result = await service.getInvoicesToNf('2023-07-01', '2023-07-30');
    // const result = await service.getItemsPaid('2023-07-01', '2023-07-30');
    // const result = await service.getPaidItems('2023-07-01', '2023-07-30');
    const result = await service.getRevenue('2023-07-01', '2023-07-30');
    console.log(JSON.stringify(result));
  });
});
