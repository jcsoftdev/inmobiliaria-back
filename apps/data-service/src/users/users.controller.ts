import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  USERS_PATTERNS,
  CreateUserDto,
  UpdateUserDto,
  PaginatedUsersResponse,
  UpdateUserResponse,
} from '@app/contracts/users'
import { SERVICES } from '@app/shared'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.FIND_ALL)
  findAll(props: PaginateOptions): Promise<PaginatedUsersResponse> {
    return this.usersService.findAll(props)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.FIND_ONE)
  findOne(@Payload() payload: { id: string }) {
    return this.usersService.findOne(payload)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.UPDATE)
  update(@Payload() data: UpdateUserDto) {
    return this.usersService.update(data)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }) {
    return this.usersService.delete(payload)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.ADD_AGENCY)
  async addAgency(
    @Payload()
    { userId, agencyIds }: { userId: string; agencyIds: string[] },
  ): Promise<UpdateUserResponse> {
    return await this.usersService.addAgencyToUser(userId, agencyIds)
  }

  @GrpcMethod(SERVICES.USER, USERS_PATTERNS.REMOVE_AGENCY)
  removeAgency(
    @Payload()
    { userId, agencyIds }: { userId: string; agencyIds: string[] },
  ): Promise<UpdateUserResponse> {
    return this.usersService.removeAgencyFromUser(userId, agencyIds)
  }
}
