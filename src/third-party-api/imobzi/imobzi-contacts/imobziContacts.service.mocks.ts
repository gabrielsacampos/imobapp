export const imobziContactsServiceMocks = {
  getContactsByType: {
    people: [
      {
        contact_id: '2233445566',
        updated_at: '2023-09-14T11:20:00.000000',
      },
      {
        contact_id: '3344556677',
        updated_at: '2023-09-13T09:30:00.000000',
      },
      {
        contact_id: '1122334455',
        updated_at: '2023-09-15T14:10:00.000000',
      },
    ],
    organizations: [
      {
        contact_id: '5432109876',
        updated_at: '2023-09-19T11:15:00.000000',
      },
      {
        contact_id: '2468135790',
        updated_at: '2023-09-18T13:20:00.000000',
      },
      {
        contact_id: '2468135722',
        updated_at: '2023-09-18T13:20:00.000000',
      },
    ],
  },

  getPeopleIdsToUpdate: ['1122334455'],
  getOrgsIdsToUpdate: ['5432109876', '2468135790', '2468135722'],
};
