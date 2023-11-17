import { LeaseDTO } from '../../imobzi-leases/dtos/imobziLeases.dtos';

export enum WhkLeaseEvent {
  update = 'lease_updated',
  create = 'lease_created',
  deleted = 'lease_deleted',
}
export class WhkLease {
  lease?: LeaseDTO;
  db_id?: string;
  event?: string;
  database?: string;
}
