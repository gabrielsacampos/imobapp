import { ImobziPersonDTO } from '../../../../src/3party-client/imobzi/imobzi-people/dtos/imobziPeople.dtos';

export class ImobziPeopleMock {
  allPeopleFullData: ImobziPersonDTO[] = [
    {
      db_id: 123412421234,
      fullname: 'john doe sauro',
      phone: { number: '00 00000-000000' },
      email: 'john@example.com',
      code: '23',
      fields: {
        group_personal: [
          [],
          [{ field_id: 'cpf', value: '002.002.000-00' }],
          [],
          [],
          [{ field_id: 'marital_status', value: 'single' }],
          [],
          [{ field_id: 'profession', value: 'Developer' }],
          [{ field_id: 'gender', value: 'Male' }],
        ],
      },
      landlord_account_id: undefined,
      review_pending: false,
      media_source: '',
      private: false,
      pix: [],
      manager: undefined,
      crisp_people_id: undefined,
      managers_shared: [],
      bank_data: [],
      network_group_member_shared: false,
      associated_with: [],
      properties: [],
      location: '',
      firstname: '',
      tags: [],
      lastname: '',
      organizations_associated: [],
      profile_image_url: undefined,
      social_network: [],
      birthday: false,
      db_key: '',
      persons_associated: [],
      active: false,
      emails: [],
      cellphone: undefined,
      favorite: false,
      media_sources: [],
    },
  ];

  async getPersonFullData(idPerson: string): Promise<ImobziPersonDTO> {
    return this.allPeopleFullData.find((person) => person.db_id.toString() === idPerson);
  }
}
