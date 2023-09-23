import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LeaseItemsCreateDTO } from './leaseItemsCreate.dtos';

@Injectable()
export class LeaseItemsService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async createLeaseItems(id: string, data: LeaseItemsCreateDTO[]) {
    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id: Number(id) },
    });

    if (!existsIdLease) {
      throw new NotAcceptableException(`Lease id: ${existsIdLease.id} does not exist.`);
    }

    await this.prisma.lease.update({
      where: { id: Number(id) },
      data: {
        leasesItems: {
          createMany: { data },
        },
      },
    });
    return `${data.length} items created into lease`;
  }

  async findLeaseItemsById(id_imobzi: string) {
    const found = await this.prisma.lease.findUnique({
      where: { id_imobzi },
      include: {
        leasesItems: true,
      },
    });

    if (!found) {
      throw new NotAcceptableException(`Lease id: ${id_imobzi} does not exist.`);
    }
    return;
  }

  async updateLeaseItems(id: string, data: LeaseItemsCreateDTO[]) {
    const existsLease = await this.prisma.lease.findFirst({
      where: { id: Number(id) },
    });

    if (!existsLease) {
      throw new NotFoundException(`Lease ${id} dos not exist`);
    }

    await this.prisma.lease.update({
      where: { id: Number(id) },
      data: {
        leasesItems: {
          deleteMany: {},
          createMany: { data },
        },
      },
    });

    return `LeaseItems updated to ${data.length}`;
  }
}
