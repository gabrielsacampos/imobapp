import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { imobziContactsPagination } from '../../../../test/3rdParty-repositories/imobzi-repositories/contacts/imobziContacts.mock';
import { ImobziContactsRepository } from './imobziContacts.repository';

describe('ImobziContactsRepository', () => {
  let repository: ImobziContactsRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };

  beforeEach(async () => {
    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        ImobziContactsRepository,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    repository = moduleRef.get<ImobziContactsRepository>(ImobziContactsRepository);
  });
  test('repository should be defined', () => {
    expect(repository).toBeDefined();
  });
  test('getAllContacts should handle with pagination and return array of all contacts', async () => {
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      if (url === `https://api.imobzi.app/v1/contacts?cursor=`) {
        return Promise.resolve({ data: imobziContactsPagination.page1 });
      } else if (url === `https://api.imobzi.app/v1/contacts?cursor=abc`) {
        return Promise.resolve({ data: imobziContactsPagination.page2 });
      } else {
        return Promise.reject(new Error(`Error on Url: ${url}`));
      }
    });
    const result = await repository.getAllContacts();
    expect(result).toEqual([...imobziContactsPagination.page1.contacts, ...imobziContactsPagination.page2.contacts]);
  });
});
