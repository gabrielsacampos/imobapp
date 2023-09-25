import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziLeasesProvider } from './imobziLeases.provider';

const leasesMock = {
  page1: {
    cursor: 'abc',
    leases: [
      { db_id: 111111111, status: 'active' },
      { db_id: 222222222, status: 'active' },
    ],
  },
  page2: {
    cursor: null,
    leases: [
      { db_id: 333333333, status: 'active' },
      { db_id: 444444444, status: 'active' },
    ],
  },
};

const aLeaseMock = {
  db_id: 111111111,
  status: 'active',
};

describe('ImobziLeasesProvider', () => {
  let imobziLeasesProvider: ImobziLeasesProvider;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        ImobziLeasesProvider,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziLeasesProvider = moduleRef.get<ImobziLeasesProvider>(ImobziLeasesProvider);
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      const urlToUniqueLease = /^https:\/\/api\.imobzi\.app\/v1\/lease\//.test(url);
      if (urlToUniqueLease) {
        const id = url.split('/').pop();
        if (id === aLeaseMock.db_id.toString()) {
          return Promise.resolve({ data: aLeaseMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/leases?cursor=':
          return Promise.resolve({ data: leasesMock.page1 });
        case 'https://api.imobzi.app/v1/leases?cursor=abc':
          return Promise.resolve({ data: leasesMock.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllLeasesFromImobzi', async () => {
    const result = await imobziLeasesProvider.getAllLeasesFromImobzi();
    expect(result).toEqual([...leasesMock.page1.leases, ...leasesMock.page2.leases]);
  });

  test('getLaseFullDataFromImobzi', async () => {
    const result = await imobziLeasesProvider.getLeaseFullDataFromImobzi(aLeaseMock.db_id);
    expect(result).toEqual(aLeaseMock);
  });
});
