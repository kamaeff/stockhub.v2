import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddDto } from './types/add.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('add')
  async adduser(@Body() dto: AddDto) {
    return this.userService.addUser(dto);
  }
}