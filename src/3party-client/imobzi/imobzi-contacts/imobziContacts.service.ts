import { Injectable } from '@nestjs/common';
import { ImobziContactsRepository } from './imobziContacts.repository';

@Injectable()
export class ImobziContactsService {
  constructor(private readonly imobziContactsRepository: ImobziContactsRepository) {}
}
