import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dtos';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { ClerkCreateUserDTO } from './dtos/clerk.dtos';
import { ClerkService } from 'src/3party-client/clerk/clerk.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) { }

  async create(userData: ClerkCreateUserDTO): Promise<User> {

    const clerkData = this.clerkService.formatData(userData);


    const user = await this.prisma.user.create({ data: clerkData });



    return { ...user, role: user.role as UserRole };
  }

  async findByEmail(email: string): Promise<User> {
    const response = await this.prisma.user.findFirst({ where: { email } });
    return { ...response, role: response.role as UserRole };
  }
}
