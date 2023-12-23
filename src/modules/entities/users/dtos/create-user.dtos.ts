import { User, UserRole } from '../entities/user.entity';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateUserDTO extends User {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  name: string;

  role?: UserRole;
  clerk_id: string;
}
