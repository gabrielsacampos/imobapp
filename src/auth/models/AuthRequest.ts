import { Request } from 'express';
import { User } from '../../modules/entities/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
