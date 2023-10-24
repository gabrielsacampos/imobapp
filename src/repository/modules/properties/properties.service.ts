import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertyCreateDTO } from './propertiesCreate.dtos';

import { PropertiesUpdateDTO } from './propertiesUpdate.dtos';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: PropertyCreateDTO) {
    const existsIdProperty = await this.prisma.property.findUnique({
      where: { id_imobzi: data.id_imobzi },
      include: { building: { select: { name: true } } },
    });

    if (existsIdProperty) {
      throw new NotAcceptableException(
        `ID: ${data.id_imobzi} already registered to property: ${existsIdProperty.unity} - ${existsIdProperty.building.name} `,
      );
    }

    await this.prisma.property.create({ data: { ...data, owners: { createMany: { data: data.owners } } } });
    return { message: `Property #${data.id_imobzi} created` };
  }

  async findAll() {
    return await this.prisma.property.findMany({
      include: {
        building: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findById(id_imobzi: string) {
    const found = await this.prisma.property.findUnique({
      where: { id_imobzi },
      include: {
        building: {
          select: { name: true },
        },
      },
    });
    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at properties`);
    }
    return found;
  }

  async update(id_imobzi: string, data: PropertiesUpdateDTO) {
    await this.prisma.property.update({
      where: { id_imobzi },
      data: {
        ...data,
        owners: {
          deleteMany: [{ id_property_imobzi: id_imobzi }],
          createMany: { data: data.owners },
        },
      },
    });
    return { message: `Property #${id_imobzi} updated` };
  }

  async upsert(data: CreatePropertyDTO) {
    await this.prisma.property.upsert({
      where: {
        id_imobzi: data.id_imobzi,
      },
      update: {
        ...data,
        owners: {
          deleteMany: {},
          createMany: { data: data.owners },
        },
      },
      create: {
        ...data,
        owners: { createMany: { data: data.owners } },
      },
    });
  }
}
