import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { ImobziContactsMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/contacts/imobziContacts.mock';
import { ImobziContactsRepository } from './imobziContacts.repository';

describe('ImobziContactsRepository', () => {
  let repository: ImobziContactsRepository;
  let httpServiceMock: { axiosRef: { get: jest.Mock } };
  let contactsMock: ImobziContactsMock;

  beforeEach(async () => {
    httpServiceMock = { axiosRef: { get: jest.fn() } };
    contactsMock = new ImobziContactsMock();

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
    const pagination = contactsMock.pagination;
    httpServiceMock.axiosRef.get.mockImplementation((url) => {
      if (url === `https://api.imobzi.app/v1/contacts?cursor=`) {
        return Promise.resolve({ data: pagination.page1 });
      } else if (url === `https://api.imobzi.app/v1/contacts?cursor=abc`) {
        return Promise.resolve({ data: pagination.page2 });
      } else {
        return Promise.reject(new Error(`Error on Url: ${url}`));
      }
    });
    const result = await repository.getAll();
    expect(result).toEqual([...pagination.page1.contacts, ...pagination.page2.contacts]);
  });
});
