import { Injectable } from '@nestjs/common';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

@Injectable()
export class ImobziInvoicesService {
  constructor(private readonly imobziInvoicesRepository: ImobziInvoicesRepository) {}
}
