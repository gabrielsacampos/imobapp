import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePropertyDTO): Promise<Property> {
    try {
      const existingProperty = await this.findById(data.id_imobzi);
      if (existingProperty) throw new NotFoundException(`Property with id ${data.id_imobzi} already exists`);

      return await this.prisma.property.create({ data: { ...data, owners: { createMany: { data: data.owners } } } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Property[]> {
    try {
      return await this.prisma.property.findMany({
        include: {
          building: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Property> {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreatePropertyDTO): Promise<Property> {
    try {
      return await this.prisma.property.upsert({
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
    } catch (error) {
      throw new Error(error);
    }
  }
}
