import { ApiProperty } from '@nestjs/swagger'
import { users, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

type OmittedFields = 'password' | 'refresh_token'

type RewritedFields = 'created_at' | 'expires_at' | 'last_name' | 'agency_id'

export class User
  implements Readonly<Omit<users, OmittedFields | RewritedFields>>
{
  @ApiProperty({ type: String, example: 'johndoe' })
  username!: string
  @ApiProperty({ type: String, example: 'johndoe' })
  lastName!: string
  @ApiProperty({ type: String, example: 'active' })
  status!: string
  @ApiProperty({ type: String, example: '12345678' })
  dni!: string
  @ApiProperty({ type: Date, example: '2021-09-01T00:00:00.000Z' })
  expiresAt!: Date | null
  @ApiProperty({ type: String, example: 'John Doe' })
  name!: string
  @ApiProperty({
    type: String,
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  id!: string
  @ApiProperty({
    type: String,
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  agencyId!: string | null
  @ApiProperty({ type: String, example: 'mail@mail.com' })
  email!: string
  @ApiProperty({ type: Date })
  createdAt!: Date | null
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

export type UserFields =
  | 'username'
  | 'dni'
  | 'status'
  | 'id'
  | 'agency_id'
  | 'created_at'
  | 'email'
export type UserProps = PaginationProps<
  Prisma.usersWhereInput,
  Prisma.usersOrderByWithRelationInput,
  UserFields
>

export type UserSingleProps = Omit<UserProps, 'where' | 'orderBy'>
