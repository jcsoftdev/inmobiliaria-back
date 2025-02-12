import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateUserDto, UpdateUserDto } from '@app/contracts/users'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.users.create({
      data: {
        agency_id: createUserDto.agencyId,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        phone: createUserDto.phone,
        role: createUserDto.role,
        created_at: new Date(),
      },
    })
  }

  findAll() {
    return this.prismaService.users.findMany()
  }

  findOne(id: number) {
    return this.prismaService.users.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.users.update({
      where: { id },
      data: {
        agency_id: updateUserDto.agencyId,
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
        phone: updateUserDto.phone,
        role: updateUserDto.role,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.users.delete({ where: { id } })
  }
}
