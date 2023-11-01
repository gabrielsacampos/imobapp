import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryInvoiceItemsRepository } from '../../../test/repositories/inMemoryInvoiceItemsRepository/inMemoryInvoiceItemsRepository';
import { InvoiceItemsRepository } from './invoice_items.repository';

describe('InvoiceItemsRepository', () => {
  let repository: InvoiceItemsRepository;
  let inMemoryInvoiceItemsRepository: InMemoryInvoiceItemsRepository;

  beforeEach(async () => {
    inMemoryInvoiceItemsRepository = new InMemoryInvoiceItemsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: InvoiceItemsRepository, useValue: inMemoryInvoiceItemsRepository }],
    }).compile();

    repository = module.get<InvoiceItemsRepository>(InvoiceItemsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
