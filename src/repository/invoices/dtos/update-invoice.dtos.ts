import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDTO } from './create-invoice.dtos';

export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDTO) {}
