import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PropertiesCreateDTO } from './propertiesCreate.dtos';
import { PropertiesUpdateDTO } from './propertiesUpdate.dtos';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: PropertiesCreateDTO) {
    const idBigInt = BigInt(data.id);
    const buildingIdBigInt = BigInt(data.building_id);

    const existsIdProperty = await this.prisma.property.findFirst({
      where: { id: idBigInt },
      include: { building: true },
    });

    if (existsIdProperty) {
      throw new NotAcceptableException(
        `ID: ${data.id} already registered to property: ${existsIdProperty.unit} - ${existsIdProperty.building.name} `,
      );
    }

    delete data.id;
    delete data.building_id;
    await this.prisma.property.create({
      data: {
        ...data,
        id: idBigInt,
        building_id: buildingIdBigInt,
        owners: {
          create: data.owners,
        },
      },
    });

    return { message: `Property #${idBigInt} created` };
  }

  async findAll() {
    const arrayProperties = await this.prisma.property.findMany({
      include: {
        building: {
          select: {
            name: true,
          },
        },
      },
    });
    return arrayProperties.map((element) => {
      const id = element.id.toString();
      delete element.building_id;
      delete element.id;
      return { id, ...element };
    });
  }

  async findById(id: string) {
    const idBigInt = BigInt(id);
    const found = await this.prisma.property.findUnique({
      where: { id: idBigInt },
      include: {
        building: {
          select: { name: true },
        },
      },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id} not found at properties`);
    }

    delete found.building_id;
    delete found.id;

    return { id, ...found };
  }

  async update(id: string, data: PropertiesUpdateDTO) {
    const idBigInt = BigInt(id);
    const buildingBigIntId = BigInt(data.building_id);

    delete data.building_id;

    await this.prisma.property.update({
      where: { id: idBigInt },
      data: {
        ...data,
        building_id: buildingBigIntId,
        owners: {
          deleteMany: [{ id_property: idBigInt }],
          createMany: {
            data: data.owners,
          },
        },
      },
    });
    return { message: `Property #${id} updated` };
  }
}
