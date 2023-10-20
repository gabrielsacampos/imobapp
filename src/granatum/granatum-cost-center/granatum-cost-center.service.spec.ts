import { Test, TestingModule } from '@nestjs/testing';
import { isArray } from 'class-validator';
import { SharedModule } from 'src/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumCostCenterService } from './granatum-cost-center.service';
import { costCentersMock } from './granatum-cost-center.mocks';

describe('GranatumCostCenterService', () => {
  let granatumCostCenterService: GranatumCostCenterService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumCostCenterService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    granatumCostCenterService = module.get<GranatumCostCenterService>(GranatumCostCenterService);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: costCentersMock });
  });

  test('should be defined', () => {
    expect(granatumCostCenterService).toBeDefined();
  });

  test('gtAllContacts', async () => {
    const result = await granatumCostCenterService.getAllCostCenters();
    expect(result).toBeDefined();
    expect(isArray(result)).toBe(true);
  });

  test('findMotherCostCenter & findChildCostCenter', () => {
    const result1 = granatumCostCenterService.findMotherCostCenter('maurício de nassau', costCentersMock);
    expect(result1.id).toBe(244553);

    const result2 = granatumCostCenterService.findMotherCostCenter('Eko Home Club', costCentersMock);
    expect(result2.id).toBe(244545);

    const result3 = granatumCostCenterService.findChildCostCenter('Figueiras', result2);
    expect(result3.id).toBe(244546);

    const result4 = granatumCostCenterService.findChildCostCenter('Oliveiras', result2);
    expect(result4).toBeUndefined();
  });

  test('findIDByDescription', () => {
    const result = granatumCostCenterService.findIdByDescription('Eko Home Club', 'Figueiras', costCentersMock);
    expect(result).toBe(244546);

    const result2 = granatumCostCenterService.findIdByDescription('Eko Home Club', 'Ipê', costCentersMock);
    expect(result2).toBe(244547);

    const result3 = granatumCostCenterService.findIdByDescription('Eko Home Club', 'Oliveiras', costCentersMock);
    expect(result3).toBe(254187);

    const result4 = granatumCostCenterService.findIdByDescription('Jardins', 'Oliveiras', costCentersMock);
    expect(result4).toBe(254187);
  });
});
