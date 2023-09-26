import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LeasesCreateDTO } from './leasesCreate.dtos';
import { LeasesUpdateDTO } from './leasesUpdate.dtos';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  // update using db id.
  async createLeaseItems(data: LeasesCreateDTO) {
    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id_imobzi: data.id_imobzi },
    });

    if (existsIdLease) {
      throw new NotAcceptableException(`ID: ${existsIdLease.id} already registered at leases.`);
    }

    const beneficiaries = data.beneficiaries;
    delete data.beneficiaries;

    await this.prisma.lease.create({
      data: {
        ...data,
        beneficiariesLease: {
          create: beneficiaries,
        },
        leasesItems: {
          create: data.lease_items,
        },
      },
    });
    return { message: `lease #${data.id_imobzi} created` };
  }

  async findAll() {
    return await this.prisma.lease.findMany();
  }

  async findById(id: string) {
    const found = await this.prisma.lease.findUnique({
      where: { id_imobzi: id },
      include: {
        beneficiariesLease: true,
      },
    });

    if (!found) {
      throw new NotAcceptableException(`ID: ${id} not found at leases`);
    }
    return found;
  }

  async updateLeaseItems(id_imobzi: string, data: LeasesUpdateDTO) {
    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id_imobzi },
    });

    if (!existsIdLease) {
      throw new NotFoundException(`id_imobzi: ${id_imobzi} not found`);
    }

    await this.prisma.lease.update({
      where: { id_imobzi },
      data: {
        ...data,
        beneficiariesLease: {
          deleteMany: [{ id_lease_imobzi: id_imobzi }],
          createMany: {
            data: data.beneficiaries,
          },
        },
        leasesItems: {
          deleteMany: [{ id_lease_imobzi: id_imobzi }],
          createMany: {
            data: data.lease_items,
          },
        },
      },
    });

    return { message: `Items updated at lease ${id_imobzi} updated` };
  }
}
