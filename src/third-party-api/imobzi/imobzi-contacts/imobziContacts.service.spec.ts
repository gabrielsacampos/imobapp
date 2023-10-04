import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobzi.urls';
import { ImobziContactsService } from './imobziContacts.service';

const imobziContactsApiReturnMock = {
  page1: {
    cursor: 'abc',
    contacts: [
      { contact_id: '222222222222', type: 'person', updated_at: '2022-01-12' },
      { contact_id: '111111111111', type: 'organization', updated_at: '2023-01-12' },
      { contact_id: '333333333333', type: 'organization', updated_at: '2022-11-12' },
    ],
  },
  page2: {
    cursor: null,
    contacts: [
      { contact_id: '44444444444', type: 'person', updated_at: '2021-01-12' },
      { contact_id: '55555555555', type: 'organization', updated_at: '2020-01-12' },
      { contact_id: '66666666666', type: 'person', updated_at: '2022-01-12' },
    ],
  },
};

describe('ImobziContactsService -- access to third-party api data', () => {
  let imobziContactsService: ImobziContactsService;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziParamService,
        ImobziUrlService,
        ImobziContactsService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    imobziContactsService = moduleRef.get<ImobziContactsService>(ImobziContactsService);

    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      if (url === `https://api.imobzi.app/v1/contacts?cursor=`) {
        return Promise.resolve({ data: imobziContactsApiReturnMock.page1 });
      } else if (url === `https://api.imobzi.app/v1/contacts?cursor=abc`) {
        return Promise.resolve({ data: imobziContactsApiReturnMock.page2 });
      } else {
        return Promise.reject(new Error(`Error on Url: ${url}`));
      }
    });
  });

  test('getAllContacts', async () => {
    const result = await imobziContactsService.getAllContacts();
    expect(result).toEqual([
      ...imobziContactsApiReturnMock.page1.contacts,
      ...imobziContactsApiReturnMock.page2.contacts,
    ]);
  });
});
