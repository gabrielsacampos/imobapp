import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { ImobziInvoicesService } from './imobziInvoices.service';
import { imobziInvoiceMock, imobziInvoicesMock } from './imobziInvoices.mocks';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

describe('ImobziInvoicesService', () => {
  let imobziInvoicesService: ImobziInvoicesService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        MyFunctionsService,
        ImobziInvoicesService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziInvoicesService = moduleRef.get<ImobziInvoicesService>(ImobziInvoicesService);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueLease = /^https:\/\/api\.imobzi\.app\/v1\/invoice\//.test(url);
      if (urlToUniqueLease) {
        const id = url.split('/').pop();
        if (id === imobziInvoiceMock.invoice_id) {
          return Promise.resolve({ data: imobziInvoiceMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/invoices?page=1&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: imobziInvoicesMock.page1 });
        case 'https://api.imobzi.app/v1/invoices?page=2&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc':
          return Promise.resolve({ data: imobziInvoicesMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllInvoicesFromImobzi', async () => {
    const result = await imobziInvoicesService.getAllInvoicesFromImobzi();
    expect(result).toEqual([...imobziInvoicesMock.page1.invoices, ...imobziInvoicesMock.page2.invoices]);
  });

  test('getRequiredInvoiceItemsDataToDb', () => {
    const result = imobziInvoicesService.getRequiredInvoiceItemsDataToDb(imobziInvoiceMock.items);
    expect(result).toEqual([
      {
        until_due_date: false,
        item_type: 'lease_value',
        id_imobzi: '6547366854ab11ed8c9a13cb5bf0c9b6',
        description: 'Aluguel ref. 2023-01-01 a 2023-01-31',
        behavior: 'charge_tenant_and_onlend',
        include_in_dimob: true,
        management_fee: true,
        value: 1000,
        due_date: undefined,
      },
      {
        until_due_date: false,
        item_type: null,
        id_imobzi: '6547417554ab11ed97a313cb5bf0c9b6',
        description: 'Iptu',
        behavior: 'charge_tenant',
        include_in_dimob: false,
        management_fee: false,
        value: 500,
        due_date: '2022-10-25',
      },
    ]);
  });

  test('getRequiredInvoiceItemsDataToDb', async () => {
    const result = await imobziInvoicesService.getRequiredInvoicesDataToDb('abc');
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
      total_value: 1500,
      interest_value: 0,
      paid_at: '2023-01-31',
      credit_at: '2023-02-02',
      paid_manual: false,
      bank_fee_value: 3.2,
      account_credit: 'inter',
      onlending_value: 1350,
      management_fee: 150,
      id_lease_imobzi: '33333333',
      items: [
        {
          until_due_date: false,
          item_type: 'lease_value',
          id_imobzi: '6547366854ab11ed8c9a13cb5bf0c9b6',
          description: 'Aluguel ref. 2023-01-01 a 2023-01-31',
          behavior: 'charge_tenant_and_onlend',
          include_in_dimob: true,
          management_fee: true,
          value: 1000,
          due_date: undefined,
        },
        {
          until_due_date: false,
          item_type: null,
          id_imobzi: '6547417554ab11ed97a313cb5bf0c9b6',
          description: 'Iptu',
          behavior: 'charge_tenant',
          include_in_dimob: false,
          management_fee: false,
          value: 500,
          due_date: '2022-10-25',
        },
      ],
    });
  });
});
