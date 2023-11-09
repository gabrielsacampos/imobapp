import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InvoiceItemsController } from './invoice_items.controller';
import { InvoiceItemsRepository } from './invoice_items.repository';
import { InvoiceItemsService } from './invoice_items.service';

describe('InvoiceItemsController', () => {
  let controller: InvoiceItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceItemsController],
      providers: [InvoiceItemsService, InvoiceItemsRepository, PrismaService],
    }).compile();

    controller = module.get<InvoiceItemsController>(InvoiceItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
