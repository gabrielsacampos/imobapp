import { Request } from 'express';
import { User } from '../../repository/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
