import { ContactDTO } from '../imobzi-contacts/dtos/imobziContacts.dtos';

export interface StoreDb {
  contacts: boolean | true;
  buildings: boolean | true;
  properties: boolean | true;
  leases: boolean | true;
  invoices: { start_due_date: string };
}

export class ContactsJobDTO extends ContactDTO {
  index: number;
  total: number;
}
