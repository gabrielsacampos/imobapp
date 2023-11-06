import { Test, TestingModule } from '@nestjs/testing';
import { ImobziInvoicesService } from './imobziInvoices.service';
import { SharedModule } from 'src/shared.module';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

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
});
