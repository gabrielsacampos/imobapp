import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizationsCreateDTO } from './organizationsCreate.dtos';
import { OrganizationsUpdateDTO } from './organizationsUpdate.dtos';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: OrganizationsCreateDTO) {
    const idBigInt = BigInt(data.id);
    const personIdBigInt = BigInt(data.person_id_representative);

    const existsIdOrganization = await this.prisma.organization.findFirst({
      where: { id: idBigInt },
    });

    if (existsIdOrganization) {
      throw new NotFoundException(
        `ID: ${data.id} already registered at company: ${existsIdOrganization.name}`,
      );
    }

    const existsCNPJOrganiation = await this.prisma.organization.findFirst({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (existsCNPJOrganiation) {
      throw new NotFoundException(
        `CNPJ: ${data.cnpj} already registered at company: ${existsCNPJOrganiation.name}`,
      );
    }

    delete data.id;
    delete data.person_id_representative;
    const dataToStore = {
      ...data,
      id: idBigInt,
      person_id_representative: personIdBigInt,
    };

    const created = await this.prisma.organization.create({
      data: dataToStore,
    });

    return { message: `Organization ${created.name} created` };
  }

  async findById(id: string) {
    const idBigInt = BigInt(id);
    return await this.prisma.organization.findUnique({
      where: { id: idBigInt },
    });
  }

  async findAll() {
    const organizations = await this.prisma.organization.findMany();
    return organizations.map((element) => {
      const { id, person_id_representative, ...rest } = element;
      return {
        id: id.toString(),
        id_representative_person: person_id_representative.toString(),
        ...rest,
      };
    });
  }

  async update(id: string, data: OrganizationsUpdateDTO) {
    const idBigInt = BigInt(id);
    const personId = BigInt(data.person_id_representative);

    const found = await this.prisma.organization.findFirst({
      where: { id: idBigInt },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id} not found at organization`);
    }

    delete data.person_id_representative;

    const updated = await this.prisma.organization.update({
      where: { id: idBigInt },
      data: { ...data, person_id_representative: personId },
    });

    delete updated.id;
    delete updated.person_id_representative;

    return updated;
  }
}
