import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumSupliersService } from './granatum-Supliers.service';

const supliersMock = [
  { documento: '12321333200', id: 123 },
  { documento: '111222333000111', id: 321 },
];

describe('GranatumSupliersService', () => {
  let granatumSupliersService: GranatumSupliersService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumSupliersService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    granatumSupliersService = module.get<GranatumSupliersService>(GranatumSupliersService);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: supliersMock });
  });

  test('should be defined', () => {
    expect(granatumSupliersService).toBeDefined();
  });

  test('gtAllSupliers', async () => {
    const result = await granatumSupliersService.getAllSupliers();
    expect(result).toBe(supliersMock);
    expect(result).toBeDefined();
  });

  test('findIdByDocument', async () => {
    const result1 = await granatumSupliersService.findIdByDocument('123.213.332-00');
    expect(result1).toBe(supliersMock[0].id);
    const result2 = await granatumSupliersService.findIdByDocument('111.222.333/0001-11');
    expect(result2).toBe(supliersMock[1].id);
  });
});
