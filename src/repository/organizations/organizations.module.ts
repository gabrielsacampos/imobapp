import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { OrganizationsRepository } from './organizations.repository';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository, PrismaService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
