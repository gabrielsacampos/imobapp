import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';
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

  it('', async () => {
    const result = await service.getPaidInvoices('2023-09-30', '2023-10-30');
    console.log(result);
  });
});
