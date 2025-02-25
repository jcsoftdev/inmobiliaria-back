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
  findOne(@Payload() id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @MessagePattern(USERS_PATTERNS.UPDATE)
  update(@Payload() updateUserDto: User): Promise<UpdateUserResponse> {
    return this.usersService.update(updateUserDto)
  }

  @MessagePattern(USERS_PATTERNS.REMOVE)
  remove(@Payload() id: number): Promise<RemoveUserResponse> {
    return this.usersService.remove(id)
  }
}
