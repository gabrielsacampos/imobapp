import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PeopleRepository } from './people.repository';
import { HttpExceptionFilter } from 'src/shared/http-excepetion.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [PeopleController],
  providers: [
    PeopleService,
    PeopleRepository,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [PeopleService, PeopleRepository],
})
export class PeopleModule { }
