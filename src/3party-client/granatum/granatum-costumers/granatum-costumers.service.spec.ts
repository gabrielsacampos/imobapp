import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumCostumersSupliersMock } from '../../../test/3rdParty-repositories/granatum-repositories/costumers-supliers/granatum-costumers-supliers.mocks';
import { GranatumCostumersRepository } from './granatum-costumers.repository';
import { GranatumCostumersService } from './granatum-costumers.service';

describe('GranatumCostumersService', () => {
  let service: GranatumCostumersService;
  let costumerssupliersMock: GranatumCostumersSupliersMock;

  beforeEach(async () => {
    costumerssupliersMock = new GranatumCostumersSupliersMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCostumersService, { provide: GranatumCostumersRepository, useValue: costumerssupliersMock }],
    }).compile();

    service = module.get<GranatumCostumersService>(GranatumCostumersService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findIdByDocument should handle with regex to find the entity ID - CPF', async () => {
    const costumerId: number = await service.findIdByDocument('123.456.789-00');
    const exists = costumerssupliersMock.allItems.find((costumer) => costumer.id === costumerId);
    expect(exists).toBeDefined();
    expect(costumerId).toEqual(2495918);
  });

  test('findIdByDocument should handle with regex to find the entity ID - CNPJ', async () => {
    const costumerId = await service.findIdByDocument('24.681.012/0001-00');
    const exists = costumerssupliersMock.allItems.find((costumer) => costumer.id === costumerId);
    expect(exists).toBeDefined();
    expect(costumerId).toEqual(2495922);
  });
});
