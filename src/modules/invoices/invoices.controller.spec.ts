import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { InMemoryInvoicesRepository } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryInvoicesRepository';
import { inMemoryInvoicesRepositoryMock } from '../../test/server-repositories/inMemoryInvoicesRepository/inMemoryRepositoryInvoices.mock';
import { UpdateInvoiceDTO } from './dtos/update-invoice.dtos';
import { InvoicesController } from './invoices.controller';
import { InvoicesRepository } from './invoices.repository';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let repository: InMemoryInvoicesRepository;
  beforeEach(async () => {
    repository = new InMemoryInvoicesRepository();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [InvoicesService, PrismaService, { provide: InvoicesRepository, useValue: repository }],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined and call create function ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'create');
    spy.mockResolvedValue(true as any);

    //call
    await controller.create({ ...inMemoryInvoicesRepositoryMock[0], invoiceItems: [] });
    expect(repository.create).toHaveBeenCalled();
  });

  it('should be defined and call update function', async () => {
    //mock
    const spy = jest.spyOn(repository, 'update');
    spy.mockResolvedValue(true as any);

    //call
    const data: UpdateInvoiceDTO = inMemoryInvoicesRepositoryMock[4];
    data.status = 'paid';
    await controller.update(data.id_imobzi, data);
    expect(repository.update).toHaveBeenCalled();
  });

  it('should be defined and call function  ', async () => {
    //mock
    const spy = jest.spyOn(repository, 'findAll');
    spy.mockResolvedValue(true as any);

    //call
    await controller.findAll();
    expect(repository.findAll).toHaveBeenCalled();
  });
});
