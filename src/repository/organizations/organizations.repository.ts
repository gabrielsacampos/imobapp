import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsRepository {
  constructor(private prisma: PrismaService) {}

  async findExistingCNPJ(cnpj: string): Promise<Organization> {
    try {
      const found = await this.prisma.organization.findFirst({
        where: {
          cnpj: cnpj,
        },
      });

      if (!found) throw new NotFoundException(`CNPJ ${cnpj} does not existis on database`);

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return await this.prisma.organization.create({ data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Organization> {
    try {
      return await this.prisma.organization.findUnique({
        where: { id_imobzi },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Organization[]> {
    try {
      return await this.prisma.organization.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateOrganizationDTO): Promise<Organization> {
    try {
      return await this.prisma.organization.upsert({
        where: { id_imobzi: data.id_imobzi },
        create: data,
        update: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
