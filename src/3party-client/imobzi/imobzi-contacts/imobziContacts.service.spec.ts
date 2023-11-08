import { Test, TestingModule } from '@nestjs/testing';
import { ImobziContactsMock } from '../../../test/3rdParty-repositories/imobzi-repositories/contacts/imobziContacts.mock';
import { ImobziContactsRepository } from './imobziContacts.repository';
import { ImobziContactsService } from './imobziContacts.service';

describe('ImobziContactsService', () => {
  let service: ImobziContactsService;
  let contactsMock: ImobziContactsMock;

  beforeEach(async () => {
    contactsMock = new ImobziContactsMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ImobziContactsService, { provide: ImobziContactsRepository, useValue: contactsMock }],
    }).compile();

    service = module.get<ImobziContactsService>(ImobziContactsService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
