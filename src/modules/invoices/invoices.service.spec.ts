import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryInvoicesRepository } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryInvoicesRepository';
import { inMemoryInvoicesRepositoryMock } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryRepositoryInvoices.mock';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { InvoicesRepository } from './invoices.repository';
import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let inMemoryInvoicesRepository: InMemoryInvoicesRepository;
  beforeEach(async () => {
    inMemoryInvoicesRepository = new InMemoryInvoicesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesService, { provide: InvoicesRepository, useValue: inMemoryInvoicesRepository }],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update invoice when it exists', async () => {
    const invoiceTest: CreateInvoiceDTO = inMemoryInvoicesRepositoryMock[0];
    invoiceTest.status = 'expired';
    const result = await service.upsert(invoiceTest);
    const updatedInvoice = inMemoryInvoicesRepositoryMock.find((invoice) => {
      return invoice.id_imobzi === invoiceTest.id_imobzi;
    });
    expect(result).toEqual(updatedInvoice);
    expect(result.status).toBe('expired');
  });

  it('upsert > should create invoice when it NOT exists', async () => {
    const invoiceTest: CreateInvoiceDTO = { ...inMemoryInvoicesRepositoryMock[0] };
    invoiceTest.id_imobzi = 'notexits';
    const result = await service.upsert(invoiceTest);
    const updatedInvoice = inMemoryInvoicesRepositoryMock.find((invoice) => {
      return invoice.id_imobzi === invoiceTest.id_imobzi;
    });
    expect(result).toEqual(updatedInvoice);
    expect(result.id_imobzi).toEqual('notexits');
  });
});
