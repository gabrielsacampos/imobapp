import { Test, TestingModule } from '@nestjs/testing';
import { ImobziInvoicesService } from './imobziInvoices.service';
import { SharedModule } from 'src/shared.module';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';
import { CreateInvoiceDTO } from '../../../modules/entities/invoices/dtos/create-invoice.dtos';
import { ImobziInvoicesMock } from '../../../test/3rdParty-repositories/imobzi-repositories/invoices/imobziInvoices.mock';
import { CreateInvoiceItemDto } from 'src/modules/entities/invoice_items/dto/create-invoice_item.dto';

describe('ImobziInvoicesService', () => {
  let service: ImobziInvoicesService;
  let invoicesMock: ImobziInvoicesMock;

  beforeEach(async () => {
    invoicesMock = new ImobziInvoicesMock();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziInvoicesService, { provide: ImobziInvoicesRepository, useValue: invoicesMock }],
    }).compile();

    service = moduleRef.get<ImobziInvoicesService>(ImobziInvoicesService);
  });

  test('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('getRequiredInvoicesITemsDataToDb should format data from imobzi and return an object with required properties', async () => {
    const invoices = invoicesMock.invoicesFullData;
    const invoiceTest = invoices[0];
    const result: CreateInvoiceItemDto[] = service.getRequiredInvoiceItemsDataToDb(invoiceTest.items);

    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });

  test('getAnInvoiceRequiredData should get from Imobzi API the full data from invoice and return only required data to store on DB', async () => {
    const invoices = invoicesMock.invoicesFullData;
    const invoiceTest = invoices[4];
    const result: CreateInvoiceDTO = await service.getRequiredData(invoiceTest.invoice_id);
    for (const prop in result) {
      expect(result[prop]).toBeDefined();
    }
  });
});
