export interface ImobziContactsDTO {
  cursor: string;
  count: number;
  count_pending: number;
  contacts: ContactDTO[];
}

export interface ContactDTO {
  created_at?: string;
  code?: string;
  name?: string;
  database?: string;
  media_source?: string;
  phones?: Phone[];
  age?: any;
  contact_type?: string;
  favorite?: boolean;
  updated_at?: string;
  contact_id?: string;
  emails?: string[];
  cnpj?: string;
  cpf?: any;
  profile_image_url?: any;
  active?: boolean;
  fullname?: any;
  email?: string;
  tags?: string[];
}

export interface GetContactReturn {
  contact_id: string;
  contact_type: string;
}

interface Phone {
  number_plain: string;
  type: string;
  number: string;
  country_code: string;
  alpha2Code: string;
}
