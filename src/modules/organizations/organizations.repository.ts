import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { UpdateOrganizationDTO } from './dtos/update-organization.dtos';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsRepository {
  constructor(private prisma: PrismaService) {}

  async findExistingCNPJ(cnpj: string): Promise<Organization> {
    const found = await this.prisma.organization.findFirst({
      where: {
        cnpj: cnpj,
      },
    });

    if (!found) throw new NotFoundException(`CNPJ ${cnpj} does not existis on database`);

    return found;
  }

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    const findExistingCNPJ = await this.findExistingCNPJ(data.cnpj);
    if (findExistingCNPJ) {
      throw new NotAcceptableException(`CNPJ ${data.cnpj} already exisits at company: ${findExistingCNPJ.name}`);
    }
    return this.prisma.organization.create({ data });
  }

  async findById(id_imobzi: string): Promise<Organization> {
    return await this.prisma.organization.findUnique({
      where: { id_imobzi },
    });
  }

  async findAll(): Promise<Organization[]> {
    return await this.prisma.organization.findMany();
  }

  async update(id_imobzi: string, data: UpdateOrganizationDTO): Promise<Organization> {
    return await this.prisma.organization.update({
      where: { id_imobzi },
      data,
    });
  }
}
