import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

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
} from '@app/contracts/users'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERNS.CREATE)
  create(@Payload() createUserDto: User): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto)
  }

  @MessagePattern(USERS_PATTERNS.FIND_ALL)
  findAll(props: UserProps): Promise<PaginatedUsersResponse> {
    return this.usersService.findAll(props)
  }

  @MessagePattern(USERS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @MessagePattern(USERS_PATTERNS.UPDATE)
  update(@Payload() updateUserDto: User): Promise<UpdateUserResponse> {
    return this.usersService.update(updateUserDto)
  }

  @MessagePattern(USERS_PATTERNS.REMOVE)
  remove(@Payload() id: string): Promise<RemoveUserResponse> {
    return this.usersService.remove(id)
  }

  @MessagePattern(USERS_PATTERNS.ADD_AGENCY)
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

  @MessagePattern(USERS_PATTERNS.REMOVE_AGENCY)
  async removeAgencies(
    @Payload() payload: UpdateUserAgencyDto,
  ): Promise<RemoveAgenciesResponse> {
    return this.usersService.removeAgencies(
      payload.userId,
      payload.agencyIds ?? [],
    )
  }
}
