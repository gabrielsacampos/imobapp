import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { ImobziLeasesMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/leases/imobziLease.mock';
import { ImobziLeasesRepository } from './imobziLeases.repository';

describe('ImobziLeasesRepository', () => {
  let repository: ImobziLeasesRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let leasesMock: ImobziLeasesMock;

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: { get: jest.fn() },
    };
    leasesMock = new ImobziLeasesMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziLeasesRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = moduleRef.get<ImobziLeasesRepository>(ImobziLeasesRepository);
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAllLeasesFromImobzi should handle with pagination and return array of all leases', async () => {
    const pagination = leasesMock.pagination;
    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      if (url === 'https://api.imobzi.app/v1/leases?smart_list=all&cursor=') {
        return Promise.resolve({ data: pagination.page1 });
      } else if (url === 'https://api.imobzi.app/v1/leases?smart_list=all&cursor=abc') {
        return Promise.resolve({ data: pagination.page2 });
      } else {
        throw new Error(`verify the url: ${url} and try again`);
      }
    });
    const result = await repository.getAll();
    expect(result).toEqual([...pagination.page1.leases, ...pagination.page2.leases]);
  });

  test('getLeaseFullData should return full data from lease on Imobzi API', async () => {
    const leases = leasesMock.allLeasesFullData;
    const leaseTest = leases[0];
    const idString = leaseTest.db_id.toString();

    httpServiceMock.axiosRef.get.mockImplementation((url: string) => {
      const urlToUniqueLease = /^https:\/\/api\.imobzi\.app\/v1\/lease\//.test(url);
      if (urlToUniqueLease) {
        const id = url.split('/').pop();
        if (id === idString) {
          return Promise.resolve({ data: leaseTest });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }
    });
    const result = await repository.getFullData(idString);
    expect(result).toEqual(leaseTest);
  });
});
