import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dtos';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDTO): Promise<User> {
    const data = {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
    };
    const user = await this.prisma.user.create({ data });

    return { ...user, password: undefined };
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
