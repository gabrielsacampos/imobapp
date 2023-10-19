import { Body, Controller, Post } from '@nestjs/common';
import { GranatumService } from './granatum.service';

@Controller('granatum')
export class GranatumController {
  constructor(private readonly granatumService: GranatumService) {}

  @Post('sync')
  async syncGranatumImobzi(@Body() data: { start_at: string; end_at: string }) {
    this.granatumService.storeItemsFromDb(data.start_at, data.end_at);
    return { message: 'GranatumService starting queue...' };
  }
}
