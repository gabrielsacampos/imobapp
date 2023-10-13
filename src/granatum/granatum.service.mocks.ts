export const getCreditInvoicesByPeriodMock = [
  {
    id_imobzi: 'invoiceid1234',
    interest_value: 0,
    paid_at: '2023-05-01',
    credit_at: '2023-05-02',
    bank_fee_value: 3.2,
    account_credit: 'Inter',
    invoiceItems: [
      { description: 'Aluguel', value: 1000 },
      { description: 'iptu', value: 100 },
    ],
    lease: {
      property: {
        unit: '333',
        property_block: 'Ipê',
        building: { name: 'Eko Home Club' },
      },
    },
  },
  {
    id_imobzi: 'invoiceid33333',
    paid_at: '2023-05-02',
    interest_value: 0,
    credit_at: '2023-05-03',
    bank_fee_value: 3.2,
    account_credit: 'Inter',
    invoiceItems: [
      { description: 'Aluguel', value: 1000 },
      { description: 'iptu', value: 100 },
    ],
    lease: {
      property: {
        unity: '202',
        property_block: 'Ipê',
        building: { name: 'Eko Home Club' },
      },
    },
  },
];

export const setGranatumIdsIntoInvoicesMock = [
  {
    id_invoice: 'invoiceid1234',
    interest_value: 0,
    id_account_granatum: 103796,
    property: {
      unit: '333',
      property_block: 'Ipê',
      building: {
        name: 'Eko Home Club',
      },
    },
    bank_fee_value: 3.2,
    credit_at: '2023-05-02',
    paid_at: '2023-05-01',
    items: [
      {
        description: 'Aluguel',
        value: 1000,
        id_category_granatum: 1846027,
        id_cost_center_granatum: 244547,
        property: {
          unit: '333',
          property_block: 'Ipê',
          building: {
            name: 'Eko Home Club',
          },
        },
      },
      {
        description: 'iptu',
        value: 100,
        id_category_granatum: 1843892,
        id_cost_center_granatum: 244547,
        property: {
          unit: '333',
          property_block: 'Ipê',
          building: {
            name: 'Eko Home Club',
          },
        },
      },
    ],
  },
  {
    id_invoice: 'invoiceid33333',
    interest_value: 0,
    id_account_granatum: 103796,
    property: {
      unity: '202',
      property_block: 'Ipê',
      building: {
        name: 'Eko Home Club',
      },
    },
    bank_fee_value: 3.2,
    credit_at: '2023-05-03',
    paid_at: '2023-05-02',
    items: [
      {
        description: 'Aluguel',
        value: 1000,
        id_category_granatum: 1846027,
        id_cost_center_granatum: 244547,
        property: {
          unity: '202',
          property_block: 'Ipê',
          building: {
            name: 'Eko Home Club',
          },
        },
      },
      {
        description: 'iptu',
        value: 100,
        id_category_granatum: 1843892,
        id_cost_center_granatum: 244547,
        property: {
          unity: '202',
          property_block: 'Ipê',
          building: {
            name: 'Eko Home Club',
          },
        },
      },
    ],
  },
];
