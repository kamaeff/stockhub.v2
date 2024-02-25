import { BadRequestException, Injectable } from '@nestjs/common';
import { AddDto } from './types/add.dto';
import { PrismaService } from 'src/prisma.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async addUser(dto: AddDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        chat_id: dto.chat_id,
      },
    });

    if (existUser) throw new BadRequestException('User already exist');

    const user = await this.prisma.user.create({
      data: {
        chat_id: faker.number.int({ min: 100000000, max: 1000000000 }),
        username: faker.person.firstName(),
        email: faker.internet.email(),
        fio: 'none',
        locale: 'none',
      },
    });

    return user;
  }
}
