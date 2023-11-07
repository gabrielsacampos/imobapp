import { ImobziOrganizationDTO } from 'src/3party-client/imobzi/imobzi-organizations/dtos/imobziOrganizations.dtos';

export class ImobziOrganizationsMock {
  allOrganizationsFullData: ImobziOrganizationDTO[] = [
    {
      code: '48',
      landlord_account_id: null,
      review_pending: false,
      media_source: 'Nenhum',
      private: false,
      pix: [],
      manager: null,
      managers_shared: [],
      bank_data: [],
      network_group_member_shared: false,
      properties: [],
      location: '-22.8386925, -43.2770421',
      email: 'thecompanymail@email.com',
      db_id: 99999999999999,
      tags: ['contact', 'renter'],
      profile_image_url: null,
      social_network: [],
      phone: {
        type: '',
        number: '(81) 99361-2341',
        country_code: '+55',
        alpha2Code: 'br',
      },
      db_key: 'ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyGQsSDE9yZ2FuaXphdGlvbhiAgMCk8__JCQyiARBhYy10Ym1zMjI5MTlseWtj',
      active: true,
      emails: ['thecompanymail@email.com'],
      cellphone: null,
      name: 'The Company Inc',
      persons: [
        {
          code: '369',
          name: 'John Fry',
          profile_image_url: null,
          person_id: 1111111111111,
          associate_type: 'Boss',
          action: '',
          id: 6036709851529216,
        },
      ],
      fields: {
        group_company_data: [
          [
            {
              default: true,
              group_position: 2,
              required: false,
              name: 'CNPJ',
              active: true,
              position: '5',
              field_id: 'cnpj',
              value: '99.999.999/0009-99',
              group_name: 'group_company_data',
            },
          ],
          [
            {
              default: true,
              group_position: 2,
              required: false,
              name: 'IM',
              active: true,
              position: '6',
              field_id: 'municipal_registration',
              value: null,
              group_name: 'group_company_data',
            },
          ],
        ],
        group_address: [
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'Endereço',
              active: true,
              position: '1',
              field_id: 'address',
              value: 'The Big Avenue, 999',
              group_name: 'group_address',
            },
          ],
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'Complemento',
              active: true,
              position: '2',
              field_id: 'address_complement',
              value: null,
              group_name: 'group_address',
            },
          ],
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'Bairro',
              active: true,
              position: '3',
              field_id: 'neighborhood',
              value: 'New Place',
              group_name: 'group_address',
            },
          ],
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'Cidade',
              active: true,
              position: '4',
              field_id: 'city',
              value: 'New City',
              group_name: 'group_address',
            },
          ],
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'state',
              active: true,
              position: '5.1',
              field_id: 'state',
              value: 'WW',
              group_name: 'group_address',
            },
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'CEP',
              active: true,
              position: '5.2',
              field_id: 'zipcode',
              value: '000000-290',
              group_name: 'group_address',
            },
          ],
          [
            {
              default: true,
              group_position: 3,
              required: false,
              name: 'País',
              active: true,
              position: '7',
              field_id: 'country',
              value: 'BigLand',
              group_name: 'group_address',
            },
          ],
        ],
      },
      favorite: false,
    },
  ];

  async getFullData(idOrg: string): Promise<ImobziOrganizationDTO> {
    return this.allOrganizationsFullData.find((org) => org.db_id.toString() === idOrg);
  }
}
