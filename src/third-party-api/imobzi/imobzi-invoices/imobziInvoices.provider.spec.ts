import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziInvoicesProvider } from './imobziInvoices.provider';

const invoicesMock = {
  page1: {
    next_page: 2,
    invoices: [
      { invoice_id: 'abc123', status: 'paid' },
      { invoice_id: 'def456', status: 'pending' },
    ],
  },
  page2: {
    next_page: null,
    invoices: [
      { invoice_id: 'ghi123', status: 'paid' },
      { invoice_id: 'jkl456', status: 'pending' },
    ],
  },
};

const aInvoiceMock = { invoice_id: 'abc', status: 'paid' };

describe('ImobziInvoicesProvider', () => {
  let imobziInvoicesProvider: ImobziInvoicesProvider;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        ImobziInvoicesProvider,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziInvoicesProvider = moduleRef.get<ImobziInvoicesProvider>(ImobziInvoicesProvider);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueLease = /^https:\/\/api\.imobzi\.app\/v1\/invoice\//.test(url);
      if (urlToUniqueLease) {
        const id = url.split('/').pop();
        if (id === aInvoiceMock.invoice_id) {
          return Promise.resolve({ data: aInvoiceMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/invoices?page=1&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: invoicesMock.page1 });
        case 'https://api.imobzi.app/v1/invoices?page=2&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: invoicesMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllInvoicesFromImobzi', async () => {
    const result = await imobziInvoicesProvider.getAllInvoicesFromImobzi();
    expect(result).toEqual([...invoicesMock.page1.invoices, ...invoicesMock.page2.invoices]);
  });

  test('getInvoiceFullDataFromImobzi', async () => {
    const result = await imobziInvoicesProvider.getInvoiceFullDataFromImobzi('abc');
    expect(result).toEqual(aInvoiceMock);
  });
});
