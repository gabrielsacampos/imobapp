import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateLeaseDTO } from './dtos/create-lease.dtos';
import { Lease } from './entities/lease.entity';

@Injectable()
export class LeasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLeaseDTO): Promise<Lease> {
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
  }

  async findAll(): Promise<Lease[]> {
    return await this.prisma.lease.findMany();
  }

  async findById(id: string): Promise<Lease> {
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
  }

  async update(id_imobzi: string, data: CreateLeaseDTO): Promise<Lease> {
    const beneficiaries = data.beneficiaries;
    delete data.beneficiaries;
    const leaseItems = data.lease_items;
    delete data.lease_items;

    return await this.prisma.lease.update({
      where: {
        id_imobzi,
      },
      data: {
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
    });
  }
}
