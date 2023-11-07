export class ImobziContactsMock {
  pagination = {
    page1: {
      cursor: 'abc',
      contacts: [
        { contact_id: '222222222222', type: 'person', updated_at: '2022-01-12' },
        { contact_id: '111111111111', type: 'organization', updated_at: '2023-01-12' },
        { contact_id: '333333333333', type: 'organization', updated_at: '2022-11-12' },
      ],
    },
    page2: {
      cursor: null,
      contacts: [
        { contact_id: '44444444444', type: 'person', updated_at: '2021-01-12' },
        { contact_id: '55555555555', type: 'organization', updated_at: '2020-01-12' },
        { contact_id: '66666666666', type: 'person', updated_at: '2022-01-12' },
      ],
    },
  };
}
