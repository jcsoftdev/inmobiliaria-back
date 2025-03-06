import { ApiProperty } from '@nestjs/swagger'
import { users, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class User
  implements Readonly<Omit<users, 'password' | 'refresh_token'>>
{
  @ApiProperty({ type: String, example: 'johndoe' })
  username!: string
  @ApiProperty({ type: String, example: 'active' })
  status!: string | null
  @ApiProperty({ type: String, example: '12345678' })
  dni!: string | null

  @ApiProperty({ type: Date, example: '2021-09-01T00:00:00.000Z' })
  expires_at!: Date | null
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
  agency_id!: string | null
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
