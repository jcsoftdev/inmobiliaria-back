import { ApiProperty } from '@nestjs/swagger'
import { users, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class User
  implements Readonly<Omit<users, 'password' | 'refresh_token'>>
{
  @ApiProperty({ type: String, example: 'John Doe' })
  name!: string
  @ApiProperty({ type: Number, example: 1 })
  id!: number
  @ApiProperty({ type: Number, example: 1 })
  agency_id!: number | null
  @ApiProperty({ type: String, example: 'mail@mail.com' })
  email!: string
  @ApiProperty({ type: Date })
  created_at!: Date | null
  // @ApiProperty({ type: String, example: 'password' })
  // password!: string
  @ApiProperty({ type: String, example: '08123456789' })
  phone!: string | null
  @ApiProperty({ type: String, example: 'admin' })
  role!: string | null
}

export class PaginatedUsersResponse extends PaginatedResult<
  Omit<User, 'password'>
> {}

export class CreateUserResponse {
  @ApiProperty({ type: String })
  message!: string
}

export class UpdateUserResponse extends CreateUserResponse {}

export class RemoveUserResponse extends CreateUserResponse {}

export type UserProps = PaginationProps<
  Prisma.usersWhereInput,
  Prisma.usersOrderByWithRelationInput,
  Prisma.usersSelect
>

export type UserSingleProps = Omit<UserProps, 'where' | 'orderBy'>
