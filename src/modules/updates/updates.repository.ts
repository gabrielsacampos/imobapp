import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateUpdateDto } from './dto/create-update.dto';
import { Update } from './entities/update.entity';

@Injectable()
export class UpdatesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUpdateDto): Promise<Update> {
    return await this.prisma.update.create({ data });
  }

  async getLastUpdateByEntity(entities: string): Promise<Update> {
    return await this.prisma.update.findFirst({
      orderBy: { updated_at: 'desc' },
      where: {
        entities,
      },
    });
  }

  async getAllLastUpdates(): Promise<Update[]> {
    const lastUpdates: any = {};

    lastUpdates.peopleLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'people' },
    });

    lastUpdates.organizationsLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'organizations' },
    });

    lastUpdates.propertiesLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'properties' },
    });

    lastUpdates.buildingsLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'buildings' },
    });

    lastUpdates.leasesLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'leases' },
    });

    lastUpdates.invoicesLastUpdate = await this.prisma.update.findMany({
      orderBy: { updated_at: 'desc' },
      where: { entities: 'invoices' },
    });

    return lastUpdates;
  }
}
