import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService implements Partial<OrganizationsRepository> {}
