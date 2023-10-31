import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PeopleRepository } from './people.repository';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository, PrismaService, PeopleController],
  exports: [PeopleService, PeopleController],
})
export class PeopleModule {}
