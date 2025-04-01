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
  UserRoles,
  UserStatus,
} from '@app/contracts/users'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    await this.prismaService.users.create({
      data: {
        id: uuidV7(),
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
          agencies: {
            select: {
              agencies: true,
            },
          },
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
    const data = {
      ...results,
      data: results.data.map(
        ({
          created_at,
          expires_at,
          last_name,
          role,
          status,
          agencies,
          ...user
        }) => {
          return {
            ...user,
            createdAt: created_at,
            expiresAt: expires_at,
            lastName: last_name,
            role: role as UserRoles,
            status: status as UserStatus,
            agencies:
              agencies?.map((a) => ({
                ...a.agencies,
                email: a.agencies.email || '',
                ruc: a.agencies.ruc || '',
              })) || [],
          }
        },
      ),
    }

    console.log(data)
    return data
  }

  async findOne({ id }: { id: string }): Promise<User> {
    const result = await this.prismaService.users.findFirstOrThrow({
      where: { id },
      select: {
        username: true,
        dni: true,
        status: true,
        id: true,
        created_at: true,
        email: true,
        name: true,
        last_name: true,
        phone: true,
        role: true,
        expires_at: true,
        agencies: {
          select: {
            agencies: true,
          },
        },
      },
    })
    return {
      ...result,
      createdAt: result.created_at,
      expiresAt: result.expires_at,
      lastName: result.last_name,
      role: result.status as UserRoles,
      status: result.status as UserStatus,
      agencies:
        result.agencies?.map((a) => ({
          ...a.agencies,
          email: a.agencies.email || '',
          ruc: a.agencies.ruc || '',
        })) || [],
    }
  }

  async update({
    id,
    expiresAt,
    lastName,
    ...updateUserDto
  }: UpdateUserDto): Promise<UpdateUserResponse> {
    try {
      await this.prismaService.users.update({
        where: { id },
        data: {
          ...updateUserDto,
          expires_at: expiresAt ? new Date(expiresAt) : undefined,
          last_name: lastName,
        },
      })

      return {
        message: 'User updated successfully',
      }
    } catch (err) {
      console.log(err)
      return {
        message: 'Error updating user',
      }
    }
  }

  async delete({ id }: { id: string }): Promise<RemoveUserResponse> {
    await this.prismaService.users.delete({
      where: { id: id },
    })
    return {
      message: 'User deleted successfully',
    }
  }

  async addAgencyToUser(userId: string, agencyIds: string[]) {
    try {
      await this.prismaService.users_agencies.createMany({
        data: agencyIds.map((agencyId) => ({
          id: uuidV7(),
          user_id: userId,
          agency_id: agencyId,
        })),
      })

      return { message: 'Agency added to user successfully' }
    } catch (error) {
      console.error('Error en addAgencyToUser:', error)
      throw new Error('Error adding agency to user')
    }
  }

  async removeAgencyFromUser(
    userId: string,
    agencyIds: string[],
  ): Promise<UpdateUserResponse> {
    await this.prismaService.users_agencies.deleteMany({
      where: {
        user_id: userId,
        agency_id: {
          in: agencyIds,
        },
      },
    })

    return {
      message: 'Agency removed from user successfully',
    }
  }
}
