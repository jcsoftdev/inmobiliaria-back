import { User } from '@app/contracts/users/user.entity'
import { UsersService } from './users.service'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.usersService.findAll()
  }

  @Post()
  create(@Body() data: User): Observable<User> {
    return this.usersService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: User): Observable<User> {
    return this.usersService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<User> {
    return this.usersService.delete(+id)
  }
}
