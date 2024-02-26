import { BadRequestException, Injectable } from '@nestjs/common';
import { AddDto } from '../dto/add.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(dto: AddDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        chat_id: dto.chat_id,
      },
    });

    console.log(existUser);
    if (existUser) throw new BadRequestException('User already exist');

    const user = await this.prisma.user.create({
      data: {
        chat_id: dto.chat_id,
        username: dto.username,
        email: dto.email,
        fio: dto.fio,
        locale: dto.locale,
      },
    });

    console.log(user);
    return user;
  }
}
