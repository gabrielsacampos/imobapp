export const getCreditInvoicesByPeriodMock = [
  {
    credit_at: '2023-09-18T00:00:00.000Z',
    account_credit: 'Inter',
    paid_at: '2023-09-14T00:00:00.000Z',
    paid_manual: null,
    id_imobzi: '009d02754be211eebf61e5d320fbd003',
    bank_fee_value: 3.2,
    interest_value: 0,
    onlending_value: 1384.52,
    invoiceItems: [
      {
        description: 'Aluguel ref. 01/08/2023 a 31/08/2023',
        value: 1628.85,
      },
    ],
    lease: {
      tenant_person: null,
      tenant_org: {
        name: 'Clinica Oftalmologica Cristina Arruda Ltda-me',
        cnpj: '11.331.127/0001-00',
      },
      beneficiariesLease: [
        {
          beneficiary_organization_imobzi: null,
          beneficiary_person_imobzi: {
            id_imobzi: '5265744175562752',
            cpf: '001.867.244-20',
          },
          share: 100,
        },
      ],
      id: 157,
      property: {
        unit: '805',
        property_block: 'Sala',
        building: {
          name: 'Trade Center',
          address: 'Avenida Oswaldo Cruz, 217',
        },
      },
    },
  },
  {
    credit_at: '2023-09-18T00:00:00.000Z',
    account_credit: 'Inter',
    paid_at: '2023-09-14T00:00:00.000Z',
    paid_manual: null,
    id_imobzi: '009d02754be211eebf61e5d320fbd003',
    bank_fee_value: 3.2,
    interest_value: 0,
    onlending_value: 1384.52,
    invoiceItems: [
      {
        description: 'Aluguel ref. 01/08/2023 a 31/08/2023',
        value: 1628.85,
      },
    ],
    lease: {
      tenant_person: null,
      tenant_org: {
        name: 'Clinica Oftalmologica Cristina Arruda Ltda-me',
        cnpj: '11.331.127/0001-00',
      },
      beneficiariesLease: [
        {
          beneficiary_organization_imobzi: null,
          beneficiary_person_imobzi: {
            id_imobzi: '5265744175562752',
            cpf: '001.867.244-20',
          },
          share: 100,
        },
      ],
      id: 157,
      property: {
        unit: '805',
        property_block: 'Sala',
        building: {
          name: 'Trade Center',
          address: 'Avenida Oswaldo Cruz, 217',
        },
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
