import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { ImobziPropertiesRepository } from './imobziProperties.repository';
import { ImobziPropertyDetailsDTO } from './dtos/imobziPropertyDetails.dtos';
import { ImobziPropertiesMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/properties/imobziProperties.mocks';

describe('ImobziPropertiesRepository', () => {
  let repository: ImobziPropertiesRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let propertiesMock: ImobziPropertiesMock;

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
      },
    };
    propertiesMock = new ImobziPropertiesMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziPropertiesRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = module.get<ImobziPropertiesRepository>(ImobziPropertiesRepository);
  });

  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('getAllProperties should handle pagination and return array of all properties', async () => {
    const pagination = propertiesMock.pagination;
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      switch (url) {
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=':
          return Promise.resolve({ data: pagination.availableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=all&cursor=def':
          return Promise.resolve({ data: pagination.availableProperties.page2 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=':
          return Promise.resolve({ data: pagination.unavailableProperties.page1 });
        case 'https://api.imobzi.app/v1/properties?smart_list=unavailable_properties&cursor=abc':
          return Promise.resolve({ data: pagination.unavailableProperties.page2 });

        default:
          throw new Error(`verify the url: ${url} and try again`);
      }
    });
    const result = await repository.getAll();
    expect(result).toEqual(
      expect.arrayContaining([
        ...pagination.unavailableProperties.page1.properties,
        ...pagination.unavailableProperties.page2.properties,
        ...pagination.availableProperties.page1.properties,
        ...pagination.availableProperties.page2.properties,
      ]),
    );
  });

  test('getPropertyFull data returns the full property data from imobzi api reponse', async () => {
    const properties = propertiesMock.allPropertiesFullData;
    const propertyTest = properties[0];

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      const urlToUniqueProperty = /^https:\/\/api\.imobzi\.app\/v1\/property\//.test(url);
      if (urlToUniqueProperty) {
        const id = url.split('/').pop();
        if (id === propertyTest.db_id.toString()) {
          return Promise.resolve({ data: propertyTest });
        } else {
          throw new Error(`verify the url: ${url} and try again`);
        }
      }
    });

    const idString = propertyTest.db_id.toString();
    const result: ImobziPropertyDetailsDTO = await repository.getFullData(idString);
    expect(result).toEqual(propertyTest);
  });
});
