import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveUserResponse,
  USERS_PATTERNS,
  UpdateUserResponse,
  User,
  UserProps,
  UpdateUserAgencyDto,
  AddAgenciesResponse,
  RemoveAgenciesResponse,
  CreateUserDto,
  UpdateUserDto,
} from '@app/contracts/users'
import { SERVICES } from '@app/shared'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.FIND_ALL)
  findAll(props: UserProps): Promise<PaginatedUsersResponse> {
    return this.usersService.findAll(props)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.FIND_ONE)
  findOne(@Payload() payload: { id: string }): Promise<User> {
    return this.usersService.findOne(payload)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.UPDATE)
  update(@Payload() updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    return this.usersService.update(updateUserDto)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }): Promise<RemoveUserResponse> {
    return this.usersService.delete(payload)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.ADD_AGENCY)
  async addAgencies(
    @Payload() payload: UpdateUserAgencyDto,
  ): Promise<AddAgenciesResponse> {
    if (
      !payload.userId ||
      !payload.agencyIds ||
      payload.agencyIds.length === 0
    ) {
      throw new Error('userId y agencyIds son requeridos')
    }

    return this.usersService.addAgencies(payload.userId, payload.agencyIds)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.REMOVE_AGENCY)
  async removeAgencies(
    @Payload() payload: UpdateUserAgencyDto,
  ): Promise<RemoveAgenciesResponse> {
    return this.usersService.removeAgencies(
      payload.userId,
      payload.agencyIds ?? [],
    )
  }
}
