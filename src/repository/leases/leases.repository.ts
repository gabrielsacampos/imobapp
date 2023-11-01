import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';

@Injectable()
export class LeasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLeaseDTO): Promise<Lease> {
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

  async findAll(): Promise<Lease[]> {
    try {
      return await this.prisma.lease.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Lease> {
    try {
      const found = await this.prisma.lease.findUnique({
        where: { id_imobzi: id },
        include: {
          beneficiariesLease: true,
        },
      });

      if (!found) {
        throw new NotFoundException(`ID: ${id} not found at leases`);
      }
      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateLeaseDTO): Promise<Lease> {
    try {
      const beneficiaries = data.beneficiaries;
      delete data.beneficiaries;
      const leaseItems = data.lease_items;
      delete data.lease_items;

      return await this.prisma.lease.upsert({
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
