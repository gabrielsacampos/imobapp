import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { imobziOrganizationMock } from './imobziOrganizations.mock';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

describe('ImobziOrganizationsService', () => {
  let imobziOrganizationsService: ImobziOrganizationsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziOrganizationsService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziOrganizationsService = moduleRef.get<ImobziOrganizationsService>(ImobziOrganizationsService);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const id = url.split('/').pop();
      if (id === imobziOrganizationMock.db_id.toString()) {
        return Promise.resolve({ data: imobziOrganizationMock });
      } else {
        return Promise.reject(`id ${id} not found at organiations`);
      }
    });
  });

  test('getRequiredOrganizationDataToDb', async () => {
    const result = await imobziOrganizationsService.getRequiredOrganizationDataToDb('99999999999999');
    expect(result).toEqual({
      address: 'The Big Avenue, 999',
      cnpj: '99.999.999/0009-99',
      id_person_representative: '1111111111111',
      representative_type: 'Boss',
      phone: '(81) 99361-2341',
      id_imobzi: '99999999999999',
      email: 'thecompanymail@email.com',
      name: 'The Company Inc',
    });
  });
});
