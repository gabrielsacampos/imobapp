import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import {
  imobziPaginationMock,
  imobziInvoicesMock,
} from '../../../../test/3rdParty-repositories/imobzi-repositories/invoices/imobziInvoices.mock';
import { RequiredPropsImobziInvoice } from './dto/required-props-invoicesItems.dtos';
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

  test('getRequiredInvoicesITemsDataToDb should format data from imobzi and return an object with required properties', async () => {
    const invoiceTest = imobziInvoicesMock[0];
    const result = repository.getRequiredInvoiceItemsDataToDb(invoiceTest.items, invoiceTest.invoice_id);
    for (const item of result) {
      expect(item).toEqual(expect.objectContaining(new RequiredPropsImobziInvoice()));
    }
  });

  test('getAnInvoiceRequiredData should get from Imobzi API the full data from invoice and return only required data to store on DB', async () => {
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

    const result = repository.getAnInvoiceRequiredData(invoiceTest.invoice_id);
    expect(result).toEqual(expect.objectContaining(new CreateInvoiceDTO()));
  });
});
