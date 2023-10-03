import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { imobziPropertiesMock, imobziPropertyMock } from './imobziProperties.mocks';
import { ImobziPropertiesService } from './imobziProperties.service';

describe('ImobziPropertiesService', () => {
  let imobziPropertiesService: ImobziPropertiesService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziUrlService,
        ImobziParamService,
        ImobziPropertiesService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziPropertiesService = moduleRef.get<ImobziPropertiesService>(ImobziPropertiesService);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueProperty = /^https:\/\/api\.imobzi\.app\/v1\/property\//.test(url);
      if (urlToUniqueProperty) {
        const id = url.split('/').pop();
        if (id === imobziPropertyMock.db_id.toString()) {
          return Promise.resolve({ data: imobziPropertyMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=':
          return Promise.resolve({ data: imobziPropertiesMock.availableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=def':
          return Promise.resolve({ data: imobziPropertiesMock.availableProperties.page2 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=':
          return Promise.resolve({ data: imobziPropertiesMock.unavailableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=abc':
          return Promise.resolve({ data: imobziPropertiesMock.unavailableProperties.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getAllProperties', async () => {
    const result = await imobziPropertiesService.getAllProperties();
    expect(result).toEqual(
      expect.arrayContaining([
        ...imobziPropertiesMock.unavailableProperties.page1.properties,
        ...imobziPropertiesMock.unavailableProperties.page2.properties,
        ...imobziPropertiesMock.availableProperties.page1.properties,
        ...imobziPropertiesMock.availableProperties.page2.properties,
      ]),
    );
  });

  test('getRequiredPropertyOwnersToDb', () => {
    const result = imobziPropertiesService.getRequiredPropertyOwnersToDb(imobziPropertyMock.owners);
    expect(result).toEqual([
      {
        share: 50,
        id_owner_organization_imobzi: '2222222222',
        id_owner_person_imobzi: null,
      },
      {
        share: 50,
        id_owner_organization_imobzi: null,
        id_owner_person_imobzi: '44444444',
      },
    ]);
  });

  test('getRequiredPropertyDataToDb', async () => {
    const result = await imobziPropertiesService.getRequiredPropertyDataToDb('1111111111111');
    expect(result).toEqual({
      unit: '2202',
      owners: [
        {
          share: 50,
          id_owner_organization_imobzi: '2222222222',
          id_owner_person_imobzi: null,
        },
        {
          share: 50,
          id_owner_organization_imobzi: null,
          id_owner_person_imobzi: '44444444',
        },
      ],
      id_imobzi: '1111111111111',
      alternative_code: '72',
      area: 60,
      id_building_imobzi: '99999999999',
      sale_value: 330000,
      rental_value: 1000,
      status: 'rented',
      type: 'apartament',
      garage: 2,
      suite: 1,
      bedroom: 2,
      active: true,
    });
  });
});
