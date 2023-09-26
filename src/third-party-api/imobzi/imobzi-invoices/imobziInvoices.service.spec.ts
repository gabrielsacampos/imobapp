import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { ImobziInvoicesProvider } from './imobziInvoices.provider';
import { ImobziInvoicesService } from './imobziInvoices.service';

// for invoices, we need a big mock of data do test it.
import { getInvoiceFullDataFromImobziMock, getInvoiceMainDataFromImobziMock } from './imobziInvoices.mocks';

const invoicesOnDbMock = [
  { id_imobzi: 'abc', status: 'pending', paid_manual: true },
  { id_imobzi: 'def', status: 'paid', paid_manual: false },
  { id_imobzi: 'ghi', status: 'canceled', paid_manual: true },
  { id_imobzi: 'jkl', status: 'expired', paid_manual: true },
];
const getAllInvoicesFromImobziMock = [
  { invoice_id: 'abc', status: 'paid' },
  { invoice_id: 'def', status: 'paid' },
  { invoice_id: 'zyw', status: 'paid' },
];

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

  test('getInvoicesImobziIdsToUpdate', async () => {
    const result = await imobziInvoicesService.getInvoicesImobziIdsToUpdate();
    expect(result).toEqual([getAllInvoicesFromImobziMock[0].invoice_id, getAllInvoicesFromImobziMock[2].invoice_id]);
  });

  test('getInvoiceMainDataFromImobzi', async () => {
    const result = await imobziInvoicesService.getInvoiceMainDataFromImobzi('abc');
    expect(result).toEqual(getInvoiceMainDataFromImobziMock);
  });
});
