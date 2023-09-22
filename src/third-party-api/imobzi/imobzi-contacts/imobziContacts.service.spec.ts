import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziContactsProvider } from './imobziContacts.provider';
// import { ImobziContactsProvider } from './imobziContacts.provider';
import { ImobziContactsService } from './ImobziContacts.service';

const allContactsMock = [
  {
    // need update
    contact_id: '111111111111111',
    updated_at: '2023-01-12',
    contact_type: 'organization',
  },
  {
    //missing on db
    contact_id: '444444444444444',
    updated_at: '2023-01-12',
    contact_type: 'organization',
  },
  {
    // need update
    contact_id: '222222222222222',
    updated_at: '2023-01-12',
    contact_type: 'person',
  },
  {
    contact_id: '333333333333333',
    updated_at: '2023-01-12',
    contact_type: 'person',
  },
];
const prismaOrganizationsMock = [{ id: 1, updated_at: '2020-01-12', id_imobzi: '111111111111111' }];

const prismaPeopleMock = [
  { id: 2, updated_at: '2020-01-12', id_imobzi: '222222222222222' },
  { id: 3, updated_at: '2023-02-12', id_imobzi: '333333333333333' },
];

describe('ImobziContactsService', () => {
  let imobziContactsService: ImobziContactsService;

  // type mocks
  let imobziContactsProviderMock: { getAllContacts: jest.Mock };
  let prismaServiceMock: {
    organization: { findMany: jest.Mock };
    person: { findMany: jest.Mock };
  };

  beforeEach(async () => {
    const getAllContactsSpy = jest.spyOn(ImobziContactsProvider.prototype, 'getAllContacts');
    getAllContactsSpy.mockResolvedValue(allContactsMock);

    //define mocks
    prismaServiceMock = {
      organization: { findMany: jest.fn() },
      person: { findMany: jest.fn() },
    };

    imobziContactsProviderMock = {
      getAllContacts: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        ImobziContactsService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: ImobziContactsProvider,
          useValue: imobziContactsProviderMock,
        },
      ],
    }).compile();

    imobziContactsService = moduleRef.get<ImobziContactsService>(ImobziContactsService);

    imobziContactsProviderMock.getAllContacts.mockResolvedValue(allContactsMock);
    prismaServiceMock.organization.findMany.mockResolvedValue(prismaOrganizationsMock);
    prismaServiceMock.person.findMany.mockResolvedValue(prismaPeopleMock);
  });

  test('getContactsByType > return divided {people, organizations} contacts', async () => {
    const result = imobziContactsService.getContactsByType(allContactsMock);
    expect(result).toEqual({
      organizations: [allContactsMock[0], allContactsMock[1]],
      people: [allContactsMock[2], allContactsMock[3]],
    });
  });

  test('getOrgsIdsToUpdate >> get missing orgs ids on db and id to update', async () => {
    const { organizations } = imobziContactsService.getContactsByType(allContactsMock);
    const result = await imobziContactsService.getOrgsImobziIdsToUpdate(organizations);
    const expectResult = [allContactsMock[0].contact_id, allContactsMock[1].contact_id];

    // depending of each situation, we never now the order of items into array
    expect(result).toEqual(expect.arrayContaining(expectResult));
  });

  test('getPeopleIdsToUpdate >> get missing people ids on db and id to update', async () => {
    const { people } = imobziContactsService.getContactsByType(allContactsMock);
    const result = await imobziContactsService.getPeopleImobziIdsToUpdate(people);
    const expectResult = [allContactsMock[2].contact_id];
    // depending of each situation, we never now the order of items into array
    expect(result).toEqual(expect.arrayContaining(expectResult));
  });

  test('getContactsImobziIdsToUpdate returns array of orgs an people imobzi ids with updates needed', async () => {
    const result = await imobziContactsService.getContactsImobziIdsToUpdate();
    expect(result).toEqual({
      peopleToUpdate: ['222222222222222'],
      orgsToUpdate: ['444444444444444', '111111111111111'],
    });
  });
});
