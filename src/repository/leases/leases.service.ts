import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { UpdateLeaseDTO } from './dtos/update-lease.dtos';
import { LeasesUpdateDTO } from './leasesUpdate.dtos';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  // update using db id.
  async create(data: CreateLeaseDTO) {
    try {
      const existsIdLease = await this.prisma.lease.findFirst({
        where: { id_imobzi: data.id_imobzi },
      });

      if (existsIdLease) {
        throw new NotAcceptableException(`ID: ${existsIdLease.id} already registered at leases.`);
      }

      const beneficiaries = data.beneficiaries;
      delete data.beneficiaries;

      return await this.prisma.lease.create({
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
    } catch (error) {
      throw new Error(error);
    }
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

  async update(id_imobzi: string, data: UpdateLeaseDTO) {
    try {
      const existsIdLease = await this.prisma.lease.findFirst({
        where: { id_imobzi },
      });

      if (!existsIdLease) {
        throw new NotFoundException(`id_imobzi: ${id_imobzi} not found`);
      }

      return await this.prisma.lease.update({
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateLeaseDTO) {
    try {
      const beneficiaries = data.beneficiaries;
      delete data.beneficiaries;
      const leaseItems = data.lease_items;
      delete data.lease_items;

      await this.prisma.lease.upsert({
        where: {
          id_imobzi: data.id_imobzi,
        },
        update: {
          ...data,
          beneficiariesLease: {
            deleteMany: {},
            createMany: { data: beneficiaries },
          },
          leasesItems: {
            deleteMany: {},
            createMany: { data: leaseItems },
          },
        },
        create: {
          ...data,
          beneficiariesLease: {
            createMany: { data: beneficiaries },
          },
          leasesItems: {
            createMany: { data: leaseItems },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
