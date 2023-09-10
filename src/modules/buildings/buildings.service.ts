import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BuildingsCreateDTO } from './buildingsCreate.dtos';
import { BuildingsUpdateDTO } from './buildingsUpdate.dtos';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: BuildingsCreateDTO) {
    const idBigInt = BigInt(data.id);
    const existsBuildingId = await this.prisma.building.findFirst({
      where: { id: idBigInt },
    });

    if (existsBuildingId) {
      throw new NotAcceptableException(
        `ID ${data.id} already exists at building: ${data.name}`,
      );
    }

    const existsBuildingName = await this.prisma.building.findFirst({
      where: { name: data.name },
    });

    if (existsBuildingName) {
      throw new NotAcceptableException(
        `Building name ${data.name} already exists`,
      );
    }

    delete data.id;

    return await this.prisma.building.create({
      data: { ...data, id: idBigInt },
    });
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
    const idBigInt = BigInt(id);
    const found = await this.prisma.building.findUnique({
      where: { id: idBigInt },
    });

    if (!found) {
      throw new NotAcceptableException(`ID: ${id} not found at buildings`);
    }

    delete found.id;

    return { id, ...found };
  }

  async update(id: string, data: BuildingsUpdateDTO) {
    const idBigInt = BigInt(id);
    const buildingExists = await this.prisma.building.findMany({
      where: { id: idBigInt },
    });

    if (!buildingExists) {
      throw new NotAcceptableException(
        `ID: ${id} does not exists at buildings`,
      );
    }

    const updated = await this.prisma.building.update({
      where: {
        id: idBigInt,
      },
      data,
    });

    delete updated.id;
    return updated;
  }
}
