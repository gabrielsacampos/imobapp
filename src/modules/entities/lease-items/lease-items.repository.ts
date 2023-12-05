import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreateLeaseItemsDTO } from './dtos/create-leaseItems.dtos';
import { LeaseItems } from './entities/leaseItems.entity';

@Injectable()
export class LeaseItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findStrictEqual(data: CreateLeaseItemsDTO): Promise<LeaseItems> {
    return await this.prisma.leaseItem.findFirst({
      where: {
        id_lease_imobzi: data.id_lease_imobzi,
        behavior: data.behavior,
        description: data.description,
        management_fee: data.management_fee,
        recurrent: data.recurrent,
        repeat_total: data.repeat_total,
        value: data.value,
        start_date: data.start_date,
        repeat_index: data.repeat_index,
        due_date: data.due_date,
        until_due_date: data.until_due_date,
        include_in_dimob: data.include_in_dimob,
      },
    });
  }
}
