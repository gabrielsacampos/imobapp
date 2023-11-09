import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBuildingDTO): Promise<Building> {
    const existsBuildingId = await this.prisma.building.findFirst({
      where: { id_imobzi: data.id_imobzi },
    });

    if (existsBuildingId) {
      throw new NotAcceptableException(`ID ${data.id_imobzi} already exists at building: ${data.name}`);
    }

    const existsBuildingName = await this.prisma.building.findFirst({
      where: { name: data.name },
    });

    if (existsBuildingName) {
      throw new NotAcceptableException(`Building name ${data.name} already exists`);
    }

    return await this.prisma.building.create({ data });
  }

  async findAll(): Promise<Building[]> {
    return await this.prisma.building.findMany();
  }

  async findById(id_imobzi: string): Promise<Building> {
    const found = await this.prisma.building.findUnique({
      where: { id_imobzi },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at buildings`);
    }
    return found;
  }

  async update(id_imobzi: string, data: CreateBuildingDTO): Promise<Building> {
    const foundBuilding = await this.prisma.building.findUnique({ where: { id_imobzi } });

    if (!foundBuilding) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at buildings`);
    }

    return await this.prisma.building.update({
      where: {
        id_imobzi,
      },
      data,
    });
  }
}
