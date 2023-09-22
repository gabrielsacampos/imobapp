import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziPropertiesProvider } from './imobziProperties.provider';
import { ImobziPropertiesService } from './imobziProperties.service';

const propertiesFromImobziMock = {
  availableProperties: [
    { db_id: '111111111111', updated_at: '2022-01-01' },
    { db_id: '222222222222', updated_at: '2022-01-01' },
  ],
  unavailableProperties: [
    { db_id: '333333333333', updated_at: '2022-01-01' },
    { db_id: '444444444444', updated_at: '2022-01-01' },
  ],
};

const propertiesOnDbMock = [
  { id_imobzi: '111111111111', updated_at: '2023-01-01' },
  { id_imobzi: '222222222222', updated_at: '2021-01-01' },
  { id_imobzi: '333333333333', updated_at: '2023-01-01' },
];

describe('ImobziPropertiesService', () => {
  let imobziPropertiesService: ImobziPropertiesService;
  let imobziPropertiesProviderMock: { getAllPropertiesFromImobzi: jest.Mock };
  let prismaMock: {
    property: {
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaMock = {
      property: {
        findMany: jest.fn(),
      },
    };

    imobziPropertiesProviderMock = {
      getAllPropertiesFromImobzi: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziPropertiesService,
        {
          provide: ImobziPropertiesProvider,
          useValue: imobziPropertiesProviderMock,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    imobziPropertiesService = moduleRef.get<ImobziPropertiesService>(ImobziPropertiesService);

    prismaMock.property.findMany.mockResolvedValue(propertiesOnDbMock);
    imobziPropertiesProviderMock.getAllPropertiesFromImobzi.mockResolvedValue(propertiesFromImobziMock);
  });

  test('getAllPropertiesFromDb', async () => {
    const result = await imobziPropertiesService.getAllPropertiesFromDb();
    expect(result).toEqual(propertiesOnDbMock);
  });

  test('getAllPropertiesIdsToUpdate', async () => {
    const result = await imobziPropertiesService.getPropertiesIdsToUpdate();
    const expectedResult = ['222222222222', '444444444444'];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });
});
