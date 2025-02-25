import { ApiResponseProperty } from '@nestjs/swagger'
import { users, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class User implements users {
  @ApiResponseProperty({ type: String })
  name!: string
  @ApiResponseProperty({ type: Number })
  id!: number
  @ApiResponseProperty({ type: Number })
  agency_id!: number | null
  @ApiResponseProperty({ type: String })
  email!: string
  @ApiResponseProperty({ type: Date })
  created_at!: Date | null
  @ApiResponseProperty({ type: String })
  password!: string
  @ApiResponseProperty({ type: String })
  phone!: string | null
  @ApiResponseProperty({ type: String })
  role!: string | null
}

export class PaginatedUsersResponse extends PaginatedResult<User> {}

export class CreateUserResponse {
  @ApiResponseProperty({ type: String })
  message!: string
}

export class UpdateUserResponse extends CreateUserResponse {}

export class RemoveUserResponse extends CreateUserResponse {}

export type UserProps = PaginationProps<
  Prisma.usersWhereInput,
  Prisma.usersOrderByWithRelationInput
>

export type UserSingleProps = Omit<UserProps, 'where' | 'orderBy'>
