import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDTO): Promise<any> {
    const data = {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
    };
    const user = await this.prisma.user.create({ data });

    return { ...user, password: undefined };
  }

  async findByEmail(email: string) {
    this.prisma.user.findFirst({ where: { email } });
  }
}
