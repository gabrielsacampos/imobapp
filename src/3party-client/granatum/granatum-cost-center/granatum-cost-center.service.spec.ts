import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumCostCentersMock } from '../../../test/3rdParty-repositories/granatum-repositories/costCenter/granatum-cost-center.mocks';
import { GranatumCostCenterRepository } from './granatum-cost-center.repository';
import { GranatumCostCenterService } from './granatum-cost-center.service';

describe('GranatumCostCenterService', () => {
  let service: GranatumCostCenterService;
  let costCentersMock: GranatumCostCentersMock;

  beforeEach(async () => {
    costCentersMock = new GranatumCostCentersMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCostCenterService, { provide: GranatumCostCenterRepository, useValue: costCentersMock }],
    }).compile();

    service = module.get<GranatumCostCenterService>(GranatumCostCenterService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findMotherCostCenter & findChildCostCenter', () => {
    const result1 = service.findMotherCostCenter('maurício de nassau', costCentersMock.allItems);
    expect(result1.id).toBe(244553);
    const result2 = service.findMotherCostCenter('Eko Home Club', costCentersMock.allItems);
    expect(result2.id).toBe(244545);
    const result3 = service.findChildCostCenter('Figueiras', result2);
    expect(result3.id).toBe(244546);
    const result4 = service.findChildCostCenter('Oliveiras', result2);
    expect(result4).toBeUndefined();
  });

  test('findIDByDescription', async () => {
    const result = await service.findIdByDescription('Eko Home Club', 'Figueiras');
    expect(result).toBe(244546);

    const result2 = await service.findIdByDescription('Eko Home Club', 'Ipê');
    expect(result2).toBe(244547);

    const result3 = await service.findIdByDescription('Eko Home Club', 'Oliveiras');
    expect(result3).toBe(254187);

    const result4 = await service.findIdByDescription('Jardins', 'Oliveiras');
    expect(result4).toBe(254187);
  });
});
