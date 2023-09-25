import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { ImobziInvoicesProvider } from './imobziInvoices.provider';
import { ImobziInvoicesService } from './imobziInvoices.service';

const invoicesOnDbMock = [{ id_imobzi: 'abc' }, { id_imobzi: 'def' }];
const getAllInvoicesFromImobziMock = [{ invoice_id: 'abc' }, { invoice_id: 'def' }, { invoice_id: 'ghi' }];
const getInvoiceFullDataFromImobziMock = {
  lease: { db_id: 33333333 },
  invoice_id: 'abc',
  status: 'paid',
  reference_start_at: '2023-01-01',
  reference_end_at: '2023-01-31',
  due_date: '2023-01-31',
  invoice_url: 'www.site.com',
  barcode: '4444444 44444444 444444 4444',
  bank_slip_id: '123456',
  total_value: 1000,
  interest_value: 5,
  invoice_paid_manual: false,
  charge_fee_value: 3.2,
  onlendings_and_fees: { management_fee_value: 100, predicted_onlending_value: 905 },
  account: { name: 'inter' },
  paid_at: '2023-01-31',
};

describe('ImobziInvoicesService', () => {
  let imobziInvoicesService: ImobziInvoicesService;
  let imobziInvoicesProviderMock: {
    getAllInvoicesFromImobzi: jest.Mock;
    getInvoiceFullDataFromImobzi: jest.Mock;
  };
  let prismaServiceMock: { invoice: { findMany: jest.Mock } };

  beforeEach(async () => {
    imobziInvoicesProviderMock = {
      getAllInvoicesFromImobzi: jest.fn(),
      getInvoiceFullDataFromImobzi: jest.fn(),
    };

    prismaServiceMock = { invoice: { findMany: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MyFunctionsService,
        ImobziInvoicesService,
        {
          provide: ImobziInvoicesProvider,
          useValue: imobziInvoicesProviderMock,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    imobziInvoicesService = moduleRef.get<ImobziInvoicesService>(ImobziInvoicesService);

    imobziInvoicesProviderMock.getAllInvoicesFromImobzi.mockResolvedValue(getAllInvoicesFromImobziMock);
    imobziInvoicesProviderMock.getInvoiceFullDataFromImobzi.mockResolvedValue(getInvoiceFullDataFromImobziMock);
    prismaServiceMock.invoice.findMany.mockResolvedValue(invoicesOnDbMock);
  });

  test('getInvoicesMissingIdsFromImobzi', async () => {
    const result = await imobziInvoicesService.getInvoicesMissingIdsFromImobzi();
    expect(result).toEqual([getAllInvoicesFromImobziMock[2].invoice_id]);
  });

  test('getInvoiceFullDataFromImobzi', async () => {
    const result = await imobziInvoicesService.getInvoiceFullDataFromImobzi('abc');
    expect(result).toEqual({
      id_imobzi: 'abc',
      status: 'paid',
      reference_start_at: '2023-01-01',
      reference_end_at: '2023-01-31',
      due_date: '2023-01-31',
      invoice_url: 'www.site.com',
      barcode: '4444444 44444444 444444 4444',
      bank_slip_id: '123456',
      bank_slip_url: undefined,
      total_value: 1000,
      interest_value: 5,
      paid_at: '2023-01-31',
      credit_at: '2023-02-02',
      paid_manual: false,
      bank_fee_value: 3.2,
      account_credit: 'inter',
      onlending_value: 905,
      management_fee: 100,
      id_lease_imobzi: '33333333',
    });
  });
});
