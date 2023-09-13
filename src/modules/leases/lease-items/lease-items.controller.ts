import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LeaseItemsService } from './lease-items.service';
import { LeaseItemsCreateDTO } from './leaseItemsCreate.dtos';

@Controller('lease-items')
export class LeaseItemsController {
  constructor(private readonly leaseItemsService: LeaseItemsService) {}

  @Post(':id')
  async createLeaseItems(
    @Param('id') id: string,
    @Body() data: LeaseItemsCreateDTO[],
  ) {
    return await this.leaseItemsService.createLeaseItems(id, data);
  }

  @Get(':id')
  async findLeaseItemsById(@Param('id') id: string) {
    return await this.leaseItemsService.findLeaseItemsById(id);
  }

  @Put(':id')
  async updateLeaseItems(
    @Param('id') id: string,
    @Body() data: LeaseItemsCreateDTO[],
  ) {
    return await this.leaseItemsService.updateLeaseItems(id, data);
  }
}
