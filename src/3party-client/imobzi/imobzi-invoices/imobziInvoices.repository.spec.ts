import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziInvoicesMock } from '../../../test/3rdParty-repositories/imobzi-repositories/invoices/imobziInvoices.mock';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

describe('ImobziInvoicesRepository', () => {
  let repository: ImobziInvoicesRepository;
  let invoicesMock: ImobziInvoicesMock;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    invoicesMock = new ImobziInvoicesMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ImobziInvoicesRepository, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    repository = module.get<ImobziInvoicesRepository>(ImobziInvoicesRepository);
  });

  test('getAllInvoicesFromImobzi should paginate and return array of invoices', async () => {
    const pagination = invoicesMock.pagination;
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      console.log(url);
      switch (url) {
        case 'https://api.imobzi.app/v1/invoices?page=1&status=all&start_at=2023-01-01&end_at=2100-01-01&contract_type=all&order_by=date':
          return Promise.resolve({ data: pagination.page1 });
        case 'https://api.imobzi.app/v1/invoices?page=2&status=all&start_at=2023-01-01&end_at=2100-01-01&contract_type=all&order_by=date':
          return Promise.resolve({ data: pagination.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
    const result = await repository.getAll('2023-01-01');
    expect(result).toEqual([...pagination.page1.invoices, ...pagination.page2.invoices]);
  });

  test('getAnInvoiceFullData should return the full data response from required invoiceon imobzi API', async () => {
    const allInvoices = invoicesMock.invoicesFullData;
    const invoiceTest = allInvoices[4];

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

    const result = await repository.getFullData(invoiceTest.invoice_id);
    expect(result).toEqual(invoiceTest);
  });
});
