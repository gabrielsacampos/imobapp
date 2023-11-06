import { Test, TestingModule } from '@nestjs/testing';
import { ImobziInvoicesService } from './imobziInvoices.service';
import { SharedModule } from 'src/shared.module';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';
import { CreateInvoiceDTO } from '../../../../src/repository/invoices/dtos/create-invoice.dtos';
import { imobziInvoicesMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/invoices/imobziInvoices.mock';
import { RequiredPropsImobziInvoice } from './dto/required-props-invoicesItems.dtos';

describe('ImobziInvoicesService', () => {
  let service: ImobziInvoicesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziInvoicesService, ImobziInvoicesRepository],
    }).compile();

    service = moduleRef.get<ImobziInvoicesService>(ImobziInvoicesService);
  });

  test('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('getRequiredInvoicesITemsDataToDb should format data from imobzi and return an object with required properties', async () => {
    const invoiceTest = imobziInvoicesMock[0];
    const result = service.getRequiredInvoiceItemsDataToDb(invoiceTest.items, invoiceTest.invoice_id);
    expect(result).toEqual(expect.objectContaining(new RequiredPropsImobziInvoice()));
  });

  test('getAnInvoiceRequiredData should get from Imobzi API the full data from invoice and return only required data to store on DB', async () => {
    const invoiceTest = imobziInvoicesMock[4];
    const result = service.getAnInvoiceRequiredData(invoiceTest);
    expect(result).toEqual(expect.objectContaining(new CreateInvoiceDTO()));
  });
});
