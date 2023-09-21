import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziUrlParamModule } from '../imobzi-urls-params/imobziUrls.module';
import { ImobziPropertiesService } from './imobziProperties.service';
import { imobziPropertiesMocks } from './imobzi-properties.mocks/imobziProperties.mocks';
import { prismaPropertiesMock } from 'src/database/prisma.mocks/prisma-properties.mocks/prisma-properties.mocks';

describe('ImobziPropertiesService', () => {
  let service: ImobziPropertiesService;
  let prismaServiceMock: { property: { findMany: jest.Mock } };
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
      },
    };

    prismaServiceMock = {
      property: {
        findMany: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ImobziUrlParamModule],
      providers: [
        ImobziPropertiesService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = moduleRef.get<ImobziPropertiesService>(ImobziPropertiesService);
  });

  test('getPropertiesIdsToUpdate function should return an array of id properties to update on db', async () => {
    prismaServiceMock.property.findMany.mockResolvedValue(prismaPropertiesMock);

    // testing properties pagination (available and unavailable)
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      switch (url) {
        case `https://api.imobzi.app/v1/properties?smart_list=all&cursor=`:
          return Promise.resolve({ data: imobziPropertiesMocks.availableProperties.page1 });
        case `https://api.imobzi.app/v1/properties?smart_list=all&cursor=abc`:
          return Promise.resolve({ data: imobziPropertiesMocks.availableProperties.page2 });
        case `https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=`:
          return Promise.resolve({ data: imobziPropertiesMocks.unavailableProperties.page1 });
        case `https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=def`:
          return Promise.resolve({ data: imobziPropertiesMocks.unavailableProperties.page2 });
        default:
          return Promise.reject(new Error(`Error on Url: ${url}`));
      }
    });

    const result = await service.getPropertiesIdsToUpdate();
    expect(result).toEqual([
      '1111111111111111',
      '5146872054432864',
      '51468720555532864',
      '51468720550996864',
      '5146872055332864',
      '5146872055332864',
      '5146872055332864',
      '5146872054432864',
      '51468720555532864',
      '51468720550996864',
    ]);
  });
});
