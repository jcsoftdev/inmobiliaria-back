import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

import { CreateUserDto } from '@app/contracts/users'
import {
  PaginatedUsersResponse,
  CreateUserResponse,
  UpdateUserResponse,
  User,
  RemoveUserResponse,
} from '@app/contracts/users/user.response'
import { UserSingleProps } from '@app/contracts/users/user.response'

import { UsersService } from '@gateway/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiExtraModels(PaginatedUsersResponse)
  @ApiOkResponse({
    description: 'Get all users',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedUsersResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  findAll(
    @Query() { ...props }: UserSingleProps,
  ): Promise<PaginatedUsersResponse> {
    return this.usersService.findAll(props)
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created  successfully',
    type: CreateUserResponse,
  })
  create(@Body() data: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(data)
  }

  @Patch(':id')
  @ApiResponse({
    status: 202,
    description: 'User updated successfully',
    type: UpdateUserResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: CreateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(+id, data)
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'User deleted successfully',
    type: RemoveUserResponse,
  })
  delete(@Param('id') id: string): Promise<RemoveUserResponse> {
    return this.usersService.delete(+id)
  }
}
