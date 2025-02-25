import { Injectable } from '@nestjs/common'

import { paginator } from '@app/common/pagination'
import {
  User,
  UserProps,
  CreateUserDto,
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveUserResponse,
  UpdateUserDto,
  UpdateUserResponse,
} from '@app/contracts/users'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    await this.prismaService.users.create({
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
    return {
      message: 'User created  successfully',
    }
  }

  findAll({
    orderBy,
    where,
    select,
    ...props
  }: UserProps): Promise<PaginatedUsersResponse> {
    return paginator.paginate(
      this.prismaService.users,
      {
        orderBy,
        where,
        select: {
          agency_id: true,
          created_at: true,
          email: true,
          id: true,
          name: true,
          phone: true,
          role: true,
          ...select,
        },
      },
      props,
    )
  }

  findOne(id: number): Promise<User> {
    return this.prismaService.users.findFirstOrThrow({ where: { id } })
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    await this.prismaService.users.update({
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
    return {
      message: 'User updated successfully',
    }
  }

  async remove(id: number): Promise<RemoveUserResponse> {
    await this.prismaService.users.delete({
      where: { id: Number(id) },
    })
    return {
      message: 'User deleted successfully',
    }
  }
}
