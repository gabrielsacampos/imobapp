import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { BuildingsCreateDTO } from './buildingsCreate.dtos';
import { BuildingsUpdateDTO } from './buildingsUpdate.dtos';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  // it can create properties from imobzi or not
  async create(data: BuildingsCreateDTO) {
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

    await this.prisma.building.create({ data });

    return { message: `${data.name} building created` };
  }

  async findAll() {
    const all = await this.prisma.building.findMany();
    return all.map((element) => {
      const id = element.id.toString();
      delete element.id;
      return { ...element, id };
    });
  }

  async findById(id: string) {
    const found = await this.prisma.building.findUnique({
      where: { id: Number(id) },
    });

    if (!found) {
      throw new NotAcceptableException(`ID: ${id} not found at buildings`);
    }
    return { found };
  }

  // update using db id.
  async update(id: string, data: BuildingsUpdateDTO) {
    const buildingExists = await this.prisma.building.findMany({
      where: { id: Number(id) },
    });

    if (!buildingExists) {
      throw new NotAcceptableException(`ID: ${id} does not exists at buildings`);
    }

    const updated = await this.prisma.building.update({
      where: {
        id: Number(id),
      },
      data,
    });
    return updated;
  }
}
