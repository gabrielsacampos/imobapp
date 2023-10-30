import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateBuildingDTO } from './dtos/create-building.dtos';
import { UpdateBuildingDTO } from './dtos/update-building.dtos';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: CreateBuildingDTO) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const all = await this.prisma.building.findMany();
      return all.map((element) => {
        const id = element.id.toString();
        delete element.id;
        return { ...element, id };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      const found = await this.prisma.building.findUnique({
        where: { id: Number(id) },
      });

      if (!found) {
        throw new NotAcceptableException(`ID: ${id} not found at buildings`);
      }
      return { found };
    } catch (error) {
      throw new Error(error);
    }
  }

  // update using db id.
  async update(id: string, data: UpdateBuildingDTO) {
    try {
      const buildingExists = await this.prisma.building.findFirst({
        where: { id: Number(id) },
      });

      if (!buildingExists) {
        throw new NotAcceptableException(`ID: ${id} does not exists at buildings`);
      }

      return await this.prisma.building.update({
        where: {
          id: Number(id),
        },
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async upsert(data: CreateBuildingDTO) {
    try {
      await this.prisma.building.upsert({
        where: { id_imobzi: data.id_imobzi },
        update: data,
        create: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
