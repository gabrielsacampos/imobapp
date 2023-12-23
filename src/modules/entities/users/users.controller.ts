import { Body, Controller, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ClerkCreateUserDTO } from './dtos/clerk.dtos';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() data: ClerkCreateUserDTO, @Headers() headers: { imobapp_secret: string }) {
    if (headers.imobapp_secret !== process.env.ADMIN_SECRET) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.create(data);
  }
}
