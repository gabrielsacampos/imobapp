import { Organization } from 'src/modules/entities/organizations/entities/organization.entity';
import { inMemoryPeopleRepositoryMock } from '../inMemoryPeopleRepository/inMemoryPeopleRepository.mocks';

export const inMemoryOrganizationsRepositoryMock: Organization[] = [
  {
    id_imobzi: '341142143141313123',
    id_person_representative: inMemoryPeopleRepositoryMock[2].id_imobzi,
    name: 'Organization 1',
    cnpj: '123456789001',
    representative_type: 'Type A',
    phone: '111-111-1111',
    email: 'org1@example.com',
  },
  {
    id_imobzi: '23942382384974918',
    id_person_representative: inMemoryPeopleRepositoryMock[5].id_imobzi,
    name: 'Organization 2',
    cnpj: '123456789002',
    representative_type: 'Type B',
    phone: '222-222-2222',
    email: 'org2@example.com',
  },
  {
    id_imobzi: '03428777742932',
    id_person_representative: inMemoryPeopleRepositoryMock[2].id_imobzi,
    name: 'Organization 3',
    cnpj: '123456789003',
    representative_type: 'Type C',
    phone: '333-333-3333',
    email: 'org3@example.com',
  },
  {
    id_imobzi: '02349238742734222',
    id_person_representative: inMemoryPeopleRepositoryMock[2].id_imobzi,
    name: 'Organization 4',
    cnpj: '123456789004',
    representative_type: 'Type D',
    phone: '444-444-4444',
    email: 'org4@example.com',
  },
  {
    id_imobzi: '22234444423423',
    id_person_representative: inMemoryPeopleRepositoryMock[0].id_imobzi,
    name: 'Organization 5',
    cnpj: '123456789005',
    representative_type: 'Type E',
    phone: '555-555-5555',
    email: 'org5@example.com',
  },
  {
    id_imobzi: '2342342009883',
    id_person_representative: inMemoryPeopleRepositoryMock[3].id_imobzi,
    name: 'Organization 6',
    cnpj: '123456789006',
    representative_type: 'Type F',
    phone: '666-666-6666',
    email: 'org6@example.com',
  },
  {
    id_imobzi: '3398387737773733',
    id_person_representative: inMemoryPeopleRepositoryMock[8].id_imobzi,
    name: 'Organization 7',
    cnpj: '123456789007',
    representative_type: 'Type G',
    phone: '777-777-7777',
    email: 'org7@example.com',
  },
  {
    id_imobzi: '098776742838423',
    id_person_representative: inMemoryPeopleRepositoryMock[2].id_imobzi,
    name: 'Organization 8',
    cnpj: '123456789008',
    representative_type: 'Type H',
    phone: '888-888-8888',
    email: 'org8@example.com',
  },
  {
    id_imobzi: '33092837472663784',
    id_person_representative: inMemoryPeopleRepositoryMock[0].id_imobzi,
    name: 'Organization 9',
    cnpj: '123456789009',
    representative_type: 'Type I',
    phone: '999-999-9999',
    email: 'org9@example.com',
  },
  {
    id_imobzi: '234238877482734',
    id_person_representative: inMemoryPeopleRepositoryMock[1].id_imobzi,
    name: 'Organization 10',
    cnpj: '123456789010',
    representative_type: 'Type J',
    phone: '1010-1010-1010',
    email: 'org10@example.com',
  },
];
