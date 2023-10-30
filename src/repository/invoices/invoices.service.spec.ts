import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';

const invoicesOnDbMock: Partial<Invoice[]> = [
  {
    id_imobzi: 'abc',
    id_lease_imobzi: '123',
    invoice_url: 'url.com',
    due_date: new Date('2023-01-10'),
    management_fee: 100,
    status: 'pending',
    total_value: 1000,
  },
  {
    id_imobzi: 'cdfe',
    id_lease_imobzi: '567',
    invoice_url: 'url.com',
    due_date: new Date('2023-01-10'),
    management_fee: 200,
    status: 'paid',
    total_value: 2000,
  },
];

const existsInvoice: CreateInvoiceDTO = {
  id_imobzi: invoicesOnDbMock[0].id_imobzi,
  id_lease_imobzi: invoicesOnDbMock[0].id_lease_imobzi,
  status: invoicesOnDbMock[0].status,
  due_date: invoicesOnDbMock[0].due_date,
  management_fee: invoicesOnDbMock[0].management_fee,
  invoice_url: invoicesOnDbMock[0].invoice_url,
  total_value: invoicesOnDbMock[0].total_value,
  items: [],
};

const newInvoice: CreateInvoiceDTO = {
  id_imobzi: 'etrw',
  id_lease_imobzi: '',
  status: '',
  due_date: undefined,
  management_fee: 0,
  invoice_url: '',
  total_value: 0,
  items: [],
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  let prismaMock: {
    invoice: {
      findFirst: jest.Mock;
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      upsert: jest.Mock;
      $queryRaw: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaMock = {
      invoice: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
        $queryRaw: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('service.create > should throw error if invoice already exists', async () => {
    prismaMock.invoice.findFirst.mockResolvedValue({});
    try {
      await service.create(existsInvoice);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.create > should create a new invoice and return it', async () => {
    prismaMock.invoice.create.mockResolvedValue(newInvoice);
    const result = await service.create(newInvoice);
    expect(result).toBe(newInvoice);
  });

  test('service.findAll > should call prisma.findAll()', async () => {
    prismaMock.invoice.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prismaMock.invoice.findMany).toHaveBeenCalled();
  });

  test('service.findById > should call prisma findUnique', async () => {
    prismaMock.invoice.findUnique.mockResolvedValue({});
    await service.findById('abc');
    expect(prismaMock.invoice.findUnique).toHaveBeenCalled();
  });

  test('service.update > should throw error if invoice do not exists', async () => {
    prismaMock.invoice.findFirst.mockResolvedValue(null);
    try {
      await service.update(existsInvoice.id_imobzi, existsInvoice);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('service.update > should update invoice and return it', async () => {
    const updatedInvoice: CreateInvoiceDTO = { ...invoicesOnDbMock[0], items: [] };
    updatedInvoice.status = 'suspended';

    prismaMock.invoice.findFirst.mockResolvedValue(invoicesOnDbMock[0]);
    prismaMock.invoice.update.mockResolvedValue(updatedInvoice);

    const result = await service.update(existsInvoice.id_imobzi, updatedInvoice);
    expect(result).toEqual(updatedInvoice);
  });
});
