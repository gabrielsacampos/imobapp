import { PartialType } from '@nestjs/mapped-types';
import { CreateWebhookDTO } from './create-webhook.dtos';

export class UpdateWebhookDTO extends PartialType(CreateWebhookDTO) {}
