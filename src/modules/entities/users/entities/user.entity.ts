export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  UNDEFINED = 'UNDEFINED',
}

export class User {
  id?: number;
  clerk_id?: string;
  role?: UserRole;
  name: string;
  email: string;
  last_access?: Date;
}
