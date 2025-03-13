import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  USERS_PATTERNS,
  CreateUserDto,
  UpdateUserDto,
  PaginatedUsersResponse,
  UpdateUserResponse,
} from '@app/contracts/users'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @MessagePattern(USERS_PATTERNS.FIND_ALL)
  findAll(props: PaginateOptions): Promise<PaginatedUsersResponse> {
    return this.usersService.findAll(props)
  }

  @MessagePattern(USERS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id)
  }

  @MessagePattern(USERS_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdateUserDto }) {
    return this.usersService.update(id, data)
  }

  @MessagePattern(USERS_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: string }) {
    return this.usersService.remove(payload.id)
  }

  @MessagePattern(USERS_PATTERNS.ADD_AGENCY)
  async addAgency(
    @Payload()
    { userId, agencyIds }: { userId: string; agencyIds: string[] },
  ): Promise<UpdateUserResponse> {
    await this.usersService.addAgencyToUser(userId, agencyIds)
    return { message: 'Agency added to user successfully' }
  }

  @MessagePattern(USERS_PATTERNS.REMOVE_AGENCY)
  async removeAgency(
    @Payload()
    { userId, agencyIds }: { userId: string; agencyIds: string[] },
  ): Promise<UpdateUserResponse> {
    await this.usersService.removeAgencyFromUser(userId, agencyIds)
    return { message: 'Agency removed from user successfully' }
  }
}
