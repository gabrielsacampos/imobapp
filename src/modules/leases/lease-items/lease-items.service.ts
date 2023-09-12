import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LeaseItemsCreateDTO } from './leaseItemsCreate.dtos';

@Injectable()
export class LeaseItemsService {
  constructor(private prisma: PrismaService) {}

  async createLeaseItems(id: string, data: LeaseItemsCreateDTO[]) {
    const idBigInt = BigInt(id);
    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id: idBigInt },
    });

    if (!existsIdLease) {
      throw new NotAcceptableException(
        `Lease id: ${existsIdLease.id} does not exist.`,
      );
    }

    await this.prisma.lease.update({
      where: { id: idBigInt },
      data: {
        leasesItems: {
          createMany: { data },
        },
      },
    });

    return `${data.length} items created into lease`;
  }

  async findLeaseItemsById(id: string) {
    const idBigInt = BigInt(id);
    const existsLeaseAndItems = await this.prisma.lease.findUnique({
      where: { id: idBigInt },
      include: {
        leasesItems: true,
      },
    });

    if (!existsLeaseAndItems) {
      throw new NotAcceptableException(
        `Lease id: ${existsLeaseAndItems.id} does not exist.`,
      );
    }

    return existsLeaseAndItems.leasesItems.map((element) => {
      const id = element.id.toString();
      delete element.id;
      const lease_id = element.lease_id.toString();
      delete element.lease_id;
      return { id, lease_id, ...element };
    });
  }
}
