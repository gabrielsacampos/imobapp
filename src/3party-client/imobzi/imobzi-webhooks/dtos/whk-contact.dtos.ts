import { ContactDTO } from '../../imobzi-contacts/dtos/imobziContacts.dtos';

export enum WhkContactEvent {
  update = 'contact_updated',
  create = 'contact_created',
}
export class WhkContact {
  contact?: ContactDTO;
  db_id?: string;
  event?: WhkContactEvent;
  database?: string;
}
