import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import {
  imobziInvoicesMock,
  imobziPaginationMock,
} from '../../../../test/3rdParty-repositories/imobzi-repositories/invoices/imobziInvoices.mock';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

describe('ImobziInvoicesRepository', () => {
  let repository: ImobziInvoicesRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImobziInvoicesRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = module.get<ImobziInvoicesRepository>(ImobziInvoicesRepository);
  });

  test('getAllInvoicesFromImobzi should paginate and return array of invoices', async () => {
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      switch (url) {
        case 'https://api.imobzi.app/v1/invoices?page=1&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: imobziPaginationMock.page1 });
        case 'https://api.imobzi.app/v1/invoices?page=2&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: imobziPaginationMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
    const result = await repository.getAllInvoicesFromImobzi();
    expect(result).toEqual([...imobziPaginationMock.page1.invoices, ...imobziPaginationMock.page2.invoices]);
  });

  test('getAnInvoiceFullData should return the full data response from required invoiceon imobzi API', async () => {
    const invoiceTest = imobziInvoicesMock[4];

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueInvoice = /^https:\/\/api\.imobzi\.app\/v1\/invoice\//.test(url);
      if (urlToUniqueInvoice) {
        const id = url.split('/').pop();
        if (id === invoiceTest.invoice_id) {
          return Promise.resolve({ data: invoiceTest });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }
    });

    const result = await repository.getAnInvoiceFullData(invoiceTest.invoice_id);
    expect(result).toEqual(invoiceTest);
  });
});
