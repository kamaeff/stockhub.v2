import {BadRequestException, Injectable} from '@nestjs/common'
import {AddDto} from '../dto/add.dto'
import {PrismaService} from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(dto: AddDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        chat_id: dto.chat_id,
      },
    })

    console.log(existUser)
    if (existUser) throw new BadRequestException('User already exist')

    const user = await this.prisma.user.create({
      data: {
        chat_id: dto.chat_id,
        username: dto.username,
      },
    })

    const ordersCount = await this.prisma.userOrders.count({
      where: {
        userId: user.id,
      },
    })

    const userWithOrdersCount = {
      ...user,
      ordersCount: ordersCount,
    }

    console.log(userWithOrdersCount)
    return userWithOrdersCount
  }

  async getUser(dto: AddDto) {
    const getuser = await this.prisma.user.findFirst({
      where: {
        chat_id: dto.chat_id,
      },
      include: {
        orders: true,
      },
    })

    const orders = await this.prisma.userOrders.count({
      where: {
        userId: getuser.id,
      },
    })

    if (!getuser) {
      throw new BadRequestException(`Пользователь с ${dto.chat_id} не найден`)
    }

    const response = {
      locale: getuser.locale,
      email: getuser.email,
      fio: getuser.fio,
      bonus: getuser.bonus,
      orders: orders,
    }

    console.log(response)
    return response
  }
}
