import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Webhook } from '../entities/webhook.entity';

export class CreateWebhookDTO extends Webhook {
  @IsNotEmpty()
  @IsString()
  event: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @IsNotEmpty()
  @IsString()
  db_id: string;
}
