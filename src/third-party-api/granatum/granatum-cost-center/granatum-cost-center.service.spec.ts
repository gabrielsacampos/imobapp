import { Test, TestingModule } from '@nestjs/testing';
import { isArray } from 'class-validator';
import { SharedModule } from 'src/third-party-api/shared.module';

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

  test('findIdByDescription', async () => {
    const result1 = await granatumCostCenterService.findIdByDescription({
      buildings: { name: 'Eko Home Club' },
      property_block: 'Ipê',
    });
    expect(result1).toBe(244547);

    const result2 = await granatumCostCenterService.findIdByDescription({
      buildings: { name: 'Itália' },
      property_block: null,
    });
    expect(result2).toEqual(244549);
  });
});
