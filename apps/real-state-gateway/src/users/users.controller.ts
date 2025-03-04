import { JwtAuthGuard } from '@libs/auth'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

import { CreateUserDto, UpdateUserDto } from '@app/contracts/users'
import {
  PaginatedUsersResponse,
  CreateUserResponse,
  UpdateUserResponse,
  User,
  RemoveUserResponse,
  UserSingleProps,
} from '@app/contracts/users/user.response'

import { ACCESS_TOKEN_SWAGGER } from '@gateway/constants'
import { UsersService } from '@gateway/users/users.service'

@Controller('users')
@ApiExtraModels(PaginatedUsersResponse, User)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(ACCESS_TOKEN_SWAGGER)
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
    description: 'Create user',
    type: CreateUserResponse,
  })
  create(@Body() data: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(data)
  }

  @Patch(':id')
  @ApiResponse({
    status: 202,
    description: 'Update user',
    type: UpdateUserResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(+id, data)
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'Delete user',
    type: RemoveUserResponse,
  })
  delete(@Param('id') id: string): Promise<RemoveUserResponse> {
    return this.usersService.delete(+id)
  }
}
