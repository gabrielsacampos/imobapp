import { Test, TestingModule } from '@nestjs/testing';
import { GranatumService } from './granatum.service';

describe('GranatumTransactionsService', () => {
  let service: GranatumService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [GranatumService],
    }).compile();

    service = moduleRef.get<GranatumService>(GranatumService);
  });

  it('service shoud be defined', () => {
    expect(service).toBeDefined();
  });
});
