import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { USERS_PATTERNS, CreateUserDto } from '@app/contracts/users'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @MessagePattern(USERS_PATTERNS.FIND_ALL)
  findAll() {
    return this.usersService.findAll()
  }

  @MessagePattern(USERS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id)
  }
}
