import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/third-party-api/shared.module';
import { HttpService } from '@nestjs/axios';
import { GranatumClientsService } from './granatum-clients.service';

const clientsMock = [
  { documento: '12321333200', id: 123 },
  { documento: '111222333000111', id: 321 },
];

describe('GranatumClientsService', () => {
  let granatumClientsService: GranatumClientsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumClientsService, { provide: HttpService, useValue: httpServiceMock }],
    }).compile();

    granatumClientsService = module.get<GranatumClientsService>(GranatumClientsService);
    httpServiceMock.axiosRef.get.mockResolvedValue({ data: clientsMock });
  });

  test('should be defined', () => {
    expect(granatumClientsService).toBeDefined();
  });

  test('gtAllClients', async () => {
    const result = await granatumClientsService.getAllClients();
    expect(result).toBe(clientsMock);
    expect(result).toBeDefined();
  });

  test('findIdByDocument', async () => {
    const result1 = await granatumClientsService.findIdByDocument('123.213.332-00');
    expect(result1).toBe(clientsMock[0].id);
    const result2 = await granatumClientsService.findIdByDocument('111.222.333/0001-11');
    expect(result2).toBe(clientsMock[1].id);
  });
});
