export const imobziInvoiceMock = {
  lease: { db_id: 33333333 },
  invoice_id: 'abc',
  status: 'paid',
  reference_start_at: '2023-01-01',
  reference_end_at: '2023-01-31',
  due_date: '2023-01-31',
  invoice_url: 'www.site.com',
  barcode: '4444444 44444444 444444 4444',
  bank_slip_id: '123456',
  total_value: 1500,
  interest_value: 0,
  invoice_paid_manual: false,
  charge_fee_value: 3.2,
  onlendings_and_fees: { management_fee_value: 150, predicted_onlending_value: 1350 },
  account: { name: 'inter' },
  paid_at: '2023-01-31',
  items: [
    {
      until_due_date: false,
      item_type: 'lease_value',
      contact: null,
      invoice_item_id: '6547366854ab11ed8c9a13cb5bf0c9b6',
      description: 'Aluguel ref. 2023-01-01 a 2023-01-31',
      behavior: 'charge_tenant_and_onlend',
      landlords: [],
      include_in_dimob: true,
      charge_management_fee: true,
      value: 1000.0,
    },
    {
      landlords: [],
      due_date: '2022-10-25',
      description: 'Iptu',
      invoice_item_id: '6547417554ab11ed97a313cb5bf0c9b6',
      until_due_date: false,
      charge_management_fee: false,
      value: 500.0,
      item_type: null,
      contact: null,
      behavior: 'charge_tenant',
      include_in_dimob: false,
    },
  ],
};

export const imobziInvoicesMock = {
  page1: {
    next_page: 2,
    invoices: [
      { invoice_id: 'abc123', status: 'paid' },
      { invoice_id: 'def456', status: 'pending' },
    ],
  },
  page2: {
    next_page: null,
    invoices: [
      { invoice_id: 'ghi123', status: 'paid' },
      { invoice_id: 'jkl456', status: 'pending' },
    ],
  },
};
