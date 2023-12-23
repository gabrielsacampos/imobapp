import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { ClerkModule } from 'src/3party-client/clerk/clerk.module';

@Module({
  imports: [ClerkModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
