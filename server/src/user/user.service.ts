import { BadRequestException, Injectable } from '@nestjs/common';
import { AddDto } from './types/add.dto';
import { PrismaService } from 'src/prisma.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(dto: AddDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        chat_id: dto.chat_id,
      },
    });

    console.log(dto);
    if (existUser) throw new BadRequestException('User already exist');

    const user = await this.prisma.user.create({
      data: {
        // chat_id: faker.number
        //   .int({ min: 10000000, max: 1000000000 })
        //   .toString(),
        // username: faker.person.firstName(),
        // email: faker.internet.email(),
        chat_id: dto.chat_id,
        username: dto.chat_id,
        email: dto.email,
        fio: dto.fio,
        locale: dto.locale,
      },
    });

    console.log(user);
    return user;
  }
}
