import { LeaseDTO } from '../../imobzi-leases/dtos/imobziLeases.dtos';

export enum WhkLeaseEvent {
  update = 'property_updated',
  create = 'property_created',
  deleted = 'property_deleted',
}
export class WhkLease {
  property?: LeaseDTO;
  db_id?: string;
  event?: string;
  database?: string;
}
