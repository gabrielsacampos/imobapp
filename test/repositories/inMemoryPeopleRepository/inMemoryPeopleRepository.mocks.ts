import { Person } from 'src/repository/people/entities/person.entity';

export const inMemoryPeopleRepositoryMock: Person[] = [
  {
    id_imobzi: '92382224444422203',
    cpf: '777.111.888-55',
    fullname: 'Luisa Almeida',
    email: 'luisa.almeida@example.com',
    phone: '111-222-3333',
    alternative_address: '606 Birch Lane',
    alternative_address_reference: 'Unit 5A',
    gender: 'female',
    marital_status: 'single',
    code_imobzi: '0123---456',
    profession: 'graphic designer',
    children: 0,
    pets: 1,
    kind_of_pet: 'cat',
    anual_revenue: 55000,
  },
  {
    id_imobzi: '82382224444422202',
    cpf: '666.222.444-44',
    fullname: 'Miguel Ferreira',
    email: 'miguel.ferreira@example.com',
    phone: '222-333-4444',
    alternative_address: '404 Pine Street',
    alternative_address_reference: 'Apt. 12C',
    gender: 'male',
    marital_status: 'married',
    code_imobzi: '0654---987',
    profession: 'accountant',
    children: 2,
    pets: 0,
    kind_of_pet: null,
    anual_revenue: 75000,
  },
  {
    id_imobzi: '72382224444422201',
    cpf: '555.890.333-33',
    fullname: 'Julia Oliveira',
    email: 'julia.oliveira@example.com',
    phone: '333-555-7777',
    alternative_address: '505 Maple Avenue',
    alternative_address_reference: 'Suite 301',
    gender: 'female',
    marital_status: 'single',
    code_imobzi: '0987---654',
    profession: 'doctor',
    children: 0,
    pets: 2,
    kind_of_pet: 'bird',
    anual_revenue: 120000,
  },
  {
    id_imobzi: '62382223334445500',
    cpf: '444.123.777-22',
    fullname: 'Rafael Santos',
    email: 'rafael.santos@example.com',
    phone: '555-789-1234',
    alternative_address: '303 Elm Street',
    alternative_address_reference: 'Apt. 10B',
    gender: 'male',
    marital_status: 'divorced',
    code_imobzi: '0789---456',
    profession: 'lawyer',
    children: 1,
    pets: 1,
    kind_of_pet: 'dog',
    anual_revenue: 80000,
  },
  {
    id_imobzi: '52381112223334400',
    cpf: '333.789.555-11',
    fullname: 'Ana Silva',
    email: 'ana.silva@example.com',
    phone: '987-654-3210',
    alternative_address: '202 Oak Street',
    alternative_address_reference: 'Unit 201',
    gender: 'female',
    marital_status: 'married',
    code_imobzi: '0456---123',
    profession: 'teacher',
    children: 2,
    pets: 2,
    kind_of_pet: 'cata',
    anual_revenue: 60000,
  },
];
