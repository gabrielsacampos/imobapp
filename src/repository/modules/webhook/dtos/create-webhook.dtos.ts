import { IsBoolean, IsString } from 'class-validator';
import { Webhook } from '../entities/webhook.entity';

export class CreateWebhookDTO extends Webhook {
  @IsString()
  event: string;

  @IsBoolean()
  done: boolean;

  @IsString()
  id_entity_imobzi: string;
}
