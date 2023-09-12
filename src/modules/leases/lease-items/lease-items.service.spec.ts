import { Test, TestingModule } from '@nestjs/testing';
import { LeaseItemsService } from './lease-items.service';

describe('LeaseItemsService', () => {
  let service: LeaseItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaseItemsService],
    }).compile();

    service = module.get<LeaseItemsService>(LeaseItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
