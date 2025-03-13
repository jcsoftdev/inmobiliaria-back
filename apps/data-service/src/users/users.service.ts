import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { v7 as uuidV7 } from 'uuid'

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
        id: uuidV7(),
        agency_id: createUserDto.agencyId,
        name: createUserDto.name,
        last_name: createUserDto.lastName,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
        phone: createUserDto.phone,
        role: createUserDto.role,
        created_at: new Date(),
        username: createUserDto.username,
        dni: createUserDto.dni,
        expires_at: createUserDto.expiresAt,
      },
    })
    return {
      message: 'User created  successfully',
    }
  }

  async findAll({
    orderBy,
    where,
    ...props
  }: UserProps): Promise<PaginatedUsersResponse> {
    const results = await paginator.paginate(
      this.prismaService.users,
      {
        orderBy,
        where,
        select: {
          username: true,
          dni: true,
          status: true,
          id: true,
          agency_id: true,
          created_at: true,
          email: true,
          name: true,
          last_name: true,
          phone: true,
          role: true,
          expires_at: true,
        },
      },
      props,
    )
    return {
      ...results,
      data: results.data.map(
        ({ created_at, agency_id, expires_at, last_name, ...user }) => {
          return {
            ...user,
            agencyId: agency_id,
            createdAt: created_at,
            expiresAt: expires_at,
            lastName: last_name,
          }
        },
      ),
    }
  }

  async findOne(id: string): Promise<User> {
    const result = await this.prismaService.users.findFirstOrThrow({
      where: { id },
      select: {
        username: true,
        dni: true,
        status: true,
        id: true,
        agency_id: true,
        created_at: true,
        email: true,
        name: true,
        last_name: true,
        phone: true,
        role: true,
        expires_at: true,
      },
    })
    return {
      ...result,
      agencyId: result.agency_id,
      createdAt: result.created_at,
      expiresAt: result.expires_at,
      lastName: result.last_name,
    }
  }

  async update(
    id: string,
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

  async remove(id: string): Promise<RemoveUserResponse> {
    await this.prismaService.users.delete({
      where: { id: id },
    })
    return {
      message: 'User deleted successfully',
    }
  }
}
