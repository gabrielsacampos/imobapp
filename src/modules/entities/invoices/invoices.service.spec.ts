import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryInvoicesRepository } from '../../../test/server-repositories/inMemoryInvoicesRepository/inMemoryInvoicesRepository';
import { inMemoryInvoicesRepositoryMock } from '../../../test/server-repositories/inMemoryInvoicesRepository/inMemoryRepositoryInvoices.mock';
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

  it('paidInvoices > should return items grouped with common keys as object', async () => {
    const result = await service.paidInvoices('2023-01-01', '2023-01-01');
    expect(result).toEqual([
      {
        type: 'items',
        account_credit: 'Inter',
        paid_manual: false,
        paid_at: '2023-01-01',
        credit_at: '2023-01-03',
        total_paid: 150,
        items: [
          {
            description: 'IPTU',
            behavior: 'charge_tenant',
            block: 'The Biggest',
            building: 'The Tower',
            invoice_id: 'abc',
            value: 100,
            unity: '10',
          },
          {
            description: 'Description 1',
            behavior: 'charge_tenant',
            block: 'The Biggest',
            building: 'The Tower',
            invoice_id: 'invoice_1',
            value: 50,
            unity: 'Unity 1',
          },
        ],
      },
    ]);
  });

  it('getOnlending > should return items grouped with common keys as object', async () => {
    const result = await service.predictedOnlendings('2023-01-01', '2023-01-10');
    expect(result).toEqual([
      {
        beneficiary_cpf: null,
        beneficiary_cnpj: '01.001.0001-022',
        type: 'onlending',
        total_onlending: 3000,
        account_credit: 'Inter',
        description: 'Repasse de Aluguéis',
        items: [
          {
            invoice_id: 'abc',
            description: 'Repasse a beneficiário',
            value: 1000,
            unity: '11',
            building: 'The Tower',
            block: 'C',
          },
          {
            invoice_id: 'efa',
            description: 'Repasse a beneficiário',
            value: 2000,
            unity: '11',
            building: 'The Tower',
            block: 'C',
          },
        ],
      },
      {
        beneficiary_cpf: '001.001.002-00',
        beneficiary_cnpj: null,
        type: 'onlending',
        total_onlending: 4050,
        account_credit: 'Inter',
        description: 'Repasse de Aluguéis',
        items: [
          {
            invoice_id: 'efg',
            description: 'Repasse a beneficiário',
            value: 2000,
            unity: '11',
            building: 'The Tower',
            block: 'C',
          },
          {
            invoice_id: 'fad',
            description: 'Repasse a beneficiário',
            value: 50,
            unity: '11',
            building: 'The Tower',
            block: 'C',
          },
          {
            invoice_id: 'fdsg',
            description: 'Repasse a beneficiário',
            value: 2000,
            unity: '11',
            building: 'The Tower',
            block: 'C',
          },
        ],
      },
    ]);
  });

  it('getRevenues > should return items grouped with common keys as object', async () => {
    const result = await service.predictedRevenues('2023-01-01', '2023-01-31');
    expect(result).toEqual([
      {
        owner_cpf: '123.123.231-20',
        owner_cnpj: null,
        type: 'revenue',
        total_revenue: 200,
        account_credit: 'Inter',
        description: 'Repasse de Aluguéis',
        reference: 'janeiro/2023',
        items: [
          {
            invoice_id: 'asc',
            description: 'Comissão de Aluguel',
            value: 200,
            unity: '123',
            building: 'the tower',
            block: 'B',
            paid_at: '2023-01-05',
            credit_at: '2023-01-05',
          },
        ],
      },
      {
        reference: 'janeiro/2023',
        owner_cpf: '123.123.231-20',
        owner_cnpj: null,
        type: 'revenue',
        total_revenue: 210,
        account_credit: 'Conta Proprietario',
        description: 'Repasse de Aluguéis',
        items: [
          {
            invoice_id: 'invoice_1',
            description: 'Description 1',
            value: 210,
            unity: 'Unity 1',
            building: 'the tower',
            block: 'B',
            paid_at: '2023-01-12',
            credit_at: '2023-01-12',
          },
        ],
      },
      {
        reference: 'janeiro/2023',
        owner_cpf: '123.123.231-20',
        owner_cnpj: null,
        type: 'revenue',
        total_revenue: 220,
        account_credit: 'Inter',
        description: 'Repasse de Aluguéis',
        items: [
          {
            invoice_id: 'invoice_2',
            description: 'Description 2',
            value: 220,
            unity: 'Unity 2',
            building: 'the tower',
            block: 'B',
            paid_at: '2023-01-19',
            credit_at: '2023-01-19',
          },
        ],
      },
      {
        reference: 'janeiro/2023',
        owner_cpf: '123.123.231-20',
        owner_cnpj: null,
        type: 'revenue',
        total_revenue: 230,
        account_credit: 'Conta Proprietario',
        description: 'Repasse de Aluguéis',
        items: [
          {
            invoice_id: 'invoice_3',
            description: 'Description 3',
            value: 230,
            unity: 'Unity 3',
            building: 'the tower',
            block: 'B',
            paid_at: '2023-01-26',
            credit_at: '2023-01-26',
          },
        ],
      },
    ]);
  });
});
