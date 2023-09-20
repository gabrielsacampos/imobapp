import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LeasesCreateDTO } from './leasesCreate.dtos';
import { LeasesUpdateDTO } from './leasesUpdate.dtos';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  async createLeaseItems(data: LeasesCreateDTO) {
    const idBigInt = BigInt(data.id);

    const existsIdLease = await this.prisma.lease.findFirst({
      where: { id: idBigInt },
    });

    if (existsIdLease) {
      throw new NotAcceptableException(
        `ID: ${existsIdLease.id} already registered at leases.`,
      );
    }

    const beneficiaries = data.beneficiaries;
    delete data.beneficiaries;
    delete data.id;

    await this.prisma.lease.create({
      data: {
        ...data,
        id: idBigInt,
        beneficiariesLease: {
          create: beneficiaries,
        },
      },
    });
    return { message: `lease #${idBigInt} created` };
  }

  async findAll() {
    const arrayLeases = await this.prisma.lease.findMany();
    return arrayLeases.map((element) => {
      const id = element.id.toString();
      const property_id = element.property_id.toString();
      const id_tenant_person = element.id_tenant_person
        ? element.id_tenant_person?.toString()
        : null;
      const id_tenant_organization = element.id_tenant_organization
        ? element.id_tenant_organization?.toString()
        : null;

      delete element.id_tenant_organization;
      delete element.id_tenant_person;
      delete element.id;
      delete element.property_id;

      return {
        id,
        property_id,
        id_tenant_organization,
        id_tenant_person,
        ...element,
      };
    });
  }

  async findById(id: string) {
    const idBigInt = BigInt(id);
    const found = await this.prisma.lease.findUnique({
      where: { id: idBigInt },
      include: {
        beneficiariesLease: true,
      },
    });

    if (!found) {
      throw new NotAcceptableException(`ID: ${id} not found at leases`);
    }

    const beneficiaries = found.beneficiariesLease.map((element) => {
      const id_organization = element.id_beneficiary_organization
        ? element.id_beneficiary_organization.toString()
        : null;
      const id_person = element.id_beneficiary_person
        ? element.id_beneficiary_person.toString()
        : null;

      return { id_person, id_organization, share: element.share };
    });

    const id_tenant_person = found.id_tenant_person
      ? found.id_tenant_person.toString()
      : null;
    const id_tenant_organization = found.id_tenant_organization
      ? found.id_tenant_organization.toString()
      : null;

    const property_id = found.property_id.toString();

    delete found.beneficiariesLease;
    delete found.id_tenant_person;
    delete found.id_tenant_organization;
    delete found.id;

    return {
      id,
      ...found,
      property_id,
      id_tenant_person,
      id_tenant_organization,
      beneficiaries,
    };
  }

  async updateLeaseItems(id: string, data: LeasesUpdateDTO) {
    const idBigInt = BigInt(id);
    const propertyIdBigInt = BigInt(data.property_id);

    delete data.property_id;

    await this.prisma.lease.update({
      where: { id: idBigInt },
      data: {
        ...data,
        property_id: propertyIdBigInt,
        beneficiariesLease: {
          deleteMany: [{ id_lease: idBigInt }],
          createMany: {
            data: data.beneficiaries,
          },
        },
      },
    });

    return { message: `lease ${idBigInt} updated` };
  }
}
