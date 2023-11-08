import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumCostumersSupliersMock } from '../../../test/3rdParty-repositories/granatum-repositories/costumers-supliers/granatum-costumers-supliers.mocks';
import { GranatumSupliersRepository } from './granatum-supliers.repository';
import { GranatumSupliersService } from './granatum-supliers.service';

describe('GranatumSupliersService', () => {
  let service: GranatumSupliersService;
  let costumersSupliersMock: GranatumCostumersSupliersMock;

  beforeEach(async () => {
    costumersSupliersMock = new GranatumCostumersSupliersMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumSupliersService, { provide: GranatumSupliersRepository, useValue: costumersSupliersMock }],
    }).compile();

    service = module.get<GranatumSupliersService>(GranatumSupliersService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findIdByDocument should handle with regex to find the entity ID - CPF', async () => {
    const costumerId: number = await service.findIdByDocument('123.456.789-00');
    const exists = costumersSupliersMock.allItems.find((costumer) => costumer.id === costumerId);
    expect(exists).toBeDefined();
    expect(costumerId).toEqual(2495918);
  });

  test('findIdByDocument should handle with regex to find the entity ID - CNPJ', async () => {
    const costumerId = await service.findIdByDocument('24.681.012/0001-00');
    const exists = costumersSupliersMock.allItems.find((costumer) => costumer.id === costumerId);
    expect(exists).toBeDefined();
    expect(costumerId).toEqual(2495922);
  });
});
