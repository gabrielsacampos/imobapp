import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziPropertiesProvider } from './imobziProperties.provider';
import { PropertyDetailsDTO } from './imobziPropertyDetails.dtos';

const propertiesMock = {
  unavailableProperties: {
    page1: { count: 1, cursor: 'abc', properties: [{ status: 'rented', db_id: 1 }] },
    page2: { count: 1, cursor: null, properties: [{ status: 'rented', db_id: 2 }] },
  },
  availableProperties: {
    page1: { count: 1, cursor: 'def', properties: [{ status: 'available', db_id: 1234567890 }] },
    page2: { count: 1, cursor: null, properties: [{ status: 'available', db_id: 2 }] },
  },
};

const aPropertyMock: Partial<PropertyDetailsDTO> = {
  db_id: 1234567890, // property returns id as string xD
  alternative_code: '33',
  area: 100,
  building_id: 111111111111,
  sale_value: 100000,
  rental_value: 1000,
  status: 'available',
  property_type: 'apartament',
  garage: 1,
  suite: 2,
  bedroom: 3,
  active: true,
};

describe('ImobziPropertiesProvider', () => {
  let imobziPropertiesProvider: ImobziPropertiesProvider;
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
        ImobziPropertiesProvider,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziPropertiesProvider = moduleRef.get<ImobziPropertiesProvider>(ImobziPropertiesProvider);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueProperty = /^https:\/\/api\.imobzi\.app\/v1\/property\//.test(url);
      if (urlToUniqueProperty) {
        const id = url.split('/').pop();
        if (id === aPropertyMock.db_id.toString()) {
          return Promise.resolve({ data: aPropertyMock });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }

      switch (url) {
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=':
          return Promise.resolve({ data: propertiesMock.availableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=def':
          return Promise.resolve({ data: propertiesMock.availableProperties.page2 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=':
          return Promise.resolve({ data: propertiesMock.unavailableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=abc':
          return Promise.resolve({ data: propertiesMock.unavailableProperties.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
  });

  test('getUnavailableProperties', async () => {
    const result = await imobziPropertiesProvider.getUnavailablePropertiesFromApi();
    expect(result).toEqual([
      ...propertiesMock.unavailableProperties.page1.properties,
      ...propertiesMock.unavailableProperties.page2.properties,
    ]);
  });

  test('getAvailableProperties', async () => {
    const result = await imobziPropertiesProvider.getAvailablePropertiesFromApi();
    expect(result).toEqual([
      ...propertiesMock.availableProperties.page1.properties,
      ...propertiesMock.availableProperties.page2.properties,
    ]);
  });

  test('getAllPropertiesFromImobzi', async () => {
    const result = await imobziPropertiesProvider.getAllPropertiesFromImobzi();
    expect(result).toEqual({
      availableProperties: [
        ...propertiesMock.availableProperties.page1.properties,
        ...propertiesMock.availableProperties.page2.properties,
      ],

      unavailableProperties: [
        ...propertiesMock.unavailableProperties.page1.properties,
        ...propertiesMock.unavailableProperties.page2.properties,
      ],
    });
  });

  test('getPropertyMainDataFromImobzi', async () => {
    const result = await imobziPropertiesProvider.getPropertyMainDataFromImobzi(aPropertyMock.db_id);
    expect(result).toEqual({
      id_imobzi: 1234567890,
      alternative_code: '33',
      area: 100,
      building_id: 111111111111,
      sale_value: 100000,
      rental_value: 1000,
      status: 'available',
      type: 'apartament',
      garage: 1,
      suite: 2,
      bedroom: 3,
      active: true,
    });
  });
});
