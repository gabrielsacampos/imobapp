import { Test, TestingModule } from '@nestjs/testing';
import { LeaseItemsController } from './lease-items.controller';
import { LeaseItemsService } from './lease-items.service';

describe('LeaseItemsController', () => {
  let controller: LeaseItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaseItemsController],
      providers: [LeaseItemsService],
    }).compile();

    controller = module.get<LeaseItemsController>(LeaseItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
