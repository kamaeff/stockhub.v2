import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {UserService} from './user.service'
import {AddDto} from '../dto/add.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('add')
  async adduser(@Body() dto: AddDto) {
    return this.userService.addUser(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('get')
  async getUser(@Body() dto: AddDto) {
    if (!dto.chat_id) {
      throw new BadRequestException('Не указан chat_id')
    }

    return this.userService.getUser(dto.chat_id)
  }
}
