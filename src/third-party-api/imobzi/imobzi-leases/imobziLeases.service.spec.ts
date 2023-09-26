import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziLeasesProvider } from './imobziLeases.provider';
import { ImobziLeasesService } from './imobziLeases.service';
import { getLeaseFullDataFromImobziMock, filterLeasesMainDataToDbMock } from './imobziLease.mock';

const getAllLeasesFromImobziMock = [{ db_id: 11111111 }, { db_id: 22222222 }, { db_id: 33333333 }];

const leasesOnDbMock = [{ id_imobzi: '11111111', updated_at: '2020-01-01' }];

describe('ImobziLeasesService', () => {
  let imobziLeasesService: ImobziLeasesService;
  let imobziLasesProviderMock: { getAllLeasesFromImobzi: jest.Mock; getLeaseFullDataFromImobzi: jest.Mock };
  let prismaMock: { lease: { findMany: jest.Mock } };

  beforeEach(async () => {
    imobziLasesProviderMock = {
      getAllLeasesFromImobzi: jest.fn(),
      getLeaseFullDataFromImobzi: jest.fn(),
    };
    prismaMock = { lease: { findMany: jest.fn() } };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziLeasesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: ImobziLeasesProvider,
          useValue: imobziLasesProviderMock,
        },
      ],
    }).compile();

    imobziLeasesService = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);

    imobziLeasesService = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);
    imobziLasesProviderMock.getAllLeasesFromImobzi.mockResolvedValue(getAllLeasesFromImobziMock);
    imobziLasesProviderMock.getLeaseFullDataFromImobzi.mockResolvedValue(getLeaseFullDataFromImobziMock);
    prismaMock.lease.findMany.mockResolvedValue(leasesOnDbMock);
  });

  test('getLeasesMissingIdsFromImobzi', async () => {
    const result = await imobziLeasesService.getLeasesMissingIdsFromImobzi(leasesOnDbMock);
    const expectedResult = ['22222222', '33333333'];
    expect(result).toEqual(expectedResult);
  });

  test('filterLeaseMainDataToDb', () => {
    const result = imobziLeasesService.filterLeaseMainDataToDb(getLeaseFullDataFromImobziMock);
    expect(result).toEqual(filterLeasesMainDataToDbMock);
  });

  test('getExistingLeasesIdsToUpdate', async () => {
    await imobziLeasesService.getLeasesToUpdateDb();
    expect(imobziLasesProviderMock.getLeaseFullDataFromImobzi).toHaveBeenCalled();
  });
});
