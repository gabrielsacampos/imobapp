import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LeasesCreateDTO } from './leasesCreate.dtos';
import { LeasesUpdateDTO } from './leasesUpdate.dtos';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  async create(data: LeasesCreateDTO) {
    const idBigInt = BigInt(data.id);

    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id: idBigInt },
    });

    if (existsIdLease) {
      throw new NotAcceptableException(
        `ID: ${existsIdLease.id} already registered at leases.`,
      );
    }

    delete data.id;
    await this.prisma.lease.create({
      data: { ...data, id: idBigInt },
    });

    return `lease created`;
  }

  async findAll() {
    const arrayLeases = await this.prisma.lease.findMany();
    return arrayLeases.map((element) => {
      const id = element.id.toString();
      const property_id = element.property_id.toString();
      delete element.id;
      delete element.property_id;
      return { id, property_id, ...element };
    });
  }

  async findById(id: string) {
    const idBigInt = BigInt(id);
    const found = await this.prisma.lease.findUnique({
      where: { id: idBigInt },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id} not found at leases`);
    }

    const property_id = found.property_id.toString();
    delete found.property_id;
    delete found.id;

    return { id, property_id, ...found };
  }

  async update(id: string, data: LeasesUpdateDTO) {
    const idBigInt = BigInt(id);
    const propertyIdBigInt = BigInt(data.property_id);

    delete data.property_id;

    await this.prisma.lease.update({
      where: { id: idBigInt },
      data: { ...data, property_id: propertyIdBigInt },
    });

    return 'Lease Updated';
  }
}
