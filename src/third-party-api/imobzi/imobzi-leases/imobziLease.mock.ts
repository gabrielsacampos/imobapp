export const imobziLeaseMock = {
  updated_at: '2023-01-01T00:00:00.000Z',
  duration: 30,
  start_at: '2023-01-01',
  indeterminate: true,
  irrf: true,
  include_in_dimob: true,
  status: 'active',
  code: '44',
  db_id: 11111111,
  annual_readjustment: { db_id: '999999999', name: 'IPCA' }, // here, imobzi's api returns db_id as string
  property: { db_id: 3333333 },
  guarantee: { guarantee_type: 'guarantor', details: { value: 3000 }, sponsor: { db_id: 4444444 } },
  tenants: [{ db_id: 555555, type: 'person' }],
  management_fee: { percent: 15 },
  items: [
    {
      landlords: [],
      due_date: '2023-08-27',
      repeat_total: 11,
      description: 'Seguro Incêndio',
      bar_code: '',
      charge_management_fee: false,
      recurrent: true,
      value: 11.63,
      item_type: null,
      until_due_date: false,
      behavior: 'charge_tenant',
      autopay_on_due_date: false,
      repeat_index: 2,
      include_in_dimob: false,
      contact_key: null,
      start_date: '',
    },
    {
      landlords: [],
      due_date: '2023-08-27',
      repeat_total: 10,
      description: 'IPTU',
      bar_code: '',
      charge_management_fee: false,
      recurrent: true,
      value: 85.69,
      item_type: null,
      until_due_date: false,
      behavior: 'charge_tenant_and_onlend',
      autopay_on_due_date: false,
      repeat_index: 9,
      include_in_dimob: false,
      contact_key: null,
      start_date: '',
    },
  ],
  beneficiaries: [
    {
      code: '4',
      pix: [
        {
          default: true,
          pix_key_type: 'cpf_cnpj',
          pix_key: '001.001.001-00',
        },
      ],

      cpf: '001.001.001-00',
      percent: 50.0,
      type: 'person',
      db_id: 11111111111,
    },
    {
      code: '5',
      pix: [
        {
          default: true,
          pix_key_type: 'cpf_cnpj',
          pix_key: '002.002.002/0002-00',
        },
      ],

      cpf: '002.002.002-00',
      percent: 50.0,
      type: 'organization',
      db_id: 22222222222,
    },
  ],
};

export const imobziLeasesMock = {
  page1: {
    cursor: 'abc',
    leases: [
      { db_id: 111111111, status: 'active' },
      { db_id: 222222222, status: 'active' },
    ],
  },
  page2: {
    cursor: null,
    leases: [
      { db_id: 333333333, status: 'active' },
      { db_id: 444444444, status: 'active' },
    ],
  },
};
