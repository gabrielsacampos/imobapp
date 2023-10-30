import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { UpdateOrganizationDTO } from './dtos/update-organization.dtos';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrganizationDTO) {
    try {
      const existsIdOrganization = await this.prisma.organization.findFirst({
        where: { id_imobzi: data.id_imobzi },
      });

      if (existsIdOrganization) {
        throw new NotFoundException(
          `ID: ${data.id_imobzi} already registered at company: ${existsIdOrganization.name}`,
        );
      }

      const existsCNPJOrganiation = await this.prisma.organization.findFirst({
        where: {
          cnpj: data.cnpj,
        },
      });

      if (existsCNPJOrganiation) {
        throw new NotFoundException(`CNPJ: ${data.cnpj} already registered at company: ${existsCNPJOrganiation.name}`);
      }

      return await this.prisma.organization.create({ data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string) {
    try {
      const found = await this.prisma.organization.findUnique({
        where: { id_imobzi },
      });

      if (!found) {
        throw new NotFoundException(`ID: ${id_imobzi} not found at organizations`);
      }
      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.organization.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id_imobzi: string, data: UpdateOrganizationDTO) {
    try {
      const found = await this.prisma.organization.findFirst({
        where: { id_imobzi },
      });

      if (!found) {
        throw new NotFoundException(`ID: ${id_imobzi} not found at organization`);
      }

      return await this.prisma.organization.update({ where: { id_imobzi }, data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateOrganizationDTO) {
    try {
      await this.prisma.organization.upsert({
        where: { id_imobzi: data.id_imobzi },
        create: data,
        update: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
