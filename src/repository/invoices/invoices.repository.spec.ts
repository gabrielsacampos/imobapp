import { Test, TestingModule } from '@nestjs/testing';
import { inMemoryInvoicesRepositoryMock } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryRepositoryInvoices.mock';
import { InMemoryInvoicesRepository } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryInvoicesRepository';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { InvoicesRepository } from './invoices.repository';

describe('InvoicesRepository', () => {
  let repository: InvoicesRepository;
  let inMemoryInvoicesRepository: InMemoryInvoicesRepository;

  beforeEach(async () => {
    inMemoryInvoicesRepository = new InMemoryInvoicesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: InvoicesRepository, useValue: inMemoryInvoicesRepository }],
    }).compile();

    repository = module.get<InvoicesRepository>(InvoicesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll > should return array of invoices', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryInvoicesRepositoryMock);
  });

  it('findUnique > existing id_imobzi should return a invoice', async () => {
    const randomInvoiceToTest = inMemoryInvoicesRepositoryMock[4];
    const randomPersonId = randomInvoiceToTest.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const invoice = inMemoryInvoicesRepositoryMock.find((invoice) => invoice.id_imobzi === randomPersonId);
    expect(result).toBe(invoice);
  });

  it('findUnique > NOT existing id_imobzi should NOT return a invoice', async () => {
    await expect(repository.findById('10')).rejects.toThrow();
  });

  it('create > existing id_imobzi || cpf should NOT create a invoice', async () => {
    const randomInvoiceToTest = inMemoryInvoicesRepositoryMock[4];
    await expect(repository.create(randomInvoiceToTest)).rejects.toThrow();
  });

  it('create > should create and return the new invoice', async () => {
    const newInvoice: CreateInvoiceDTO = {
      id_imobzi: '',
      id_lease_imobzi: '',
      status: '',
      due_date: undefined,
      management_fee: 0,
      invoice_url: '',
      total_value: 0,
      invoiceItems: [],
    };

    await expect(repository.create(newInvoice)).resolves.not.toThrow();
    expect(inMemoryInvoicesRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newInvoice)]));
  });

  it('update > update existing invoice if existis', async () => {
    const randomInvoiceToTest = inMemoryInvoicesRepositoryMock[4];
    const dataToUpdate: CreateInvoiceDTO = randomInvoiceToTest;
    const id_imobzi = randomInvoiceToTest.id_imobzi;
    randomInvoiceToTest.status = 'xxx';

    await expect(repository.update(id_imobzi, dataToUpdate)).resolves.not.toThrow();
    expect(inMemoryInvoicesRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomInvoiceToTest)]),
    );
  });

  it('update > NOT existing id_imobzi should NOT update any invoice', async () => {
    const randomInvoiceToTest = inMemoryInvoicesRepositoryMock[4];
    const dataToUpdate: CreateInvoiceDTO = randomInvoiceToTest;
    const id_imobzi = 'not_existing';
    randomInvoiceToTest.status = 'xxx';

    await expect(repository.update(id_imobzi, dataToUpdate)).rejects.toThrow();
  });
});
