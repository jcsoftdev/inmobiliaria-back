import { ApiProperty } from '@nestjs/swagger'
import { users, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

import { Agency } from '../agencies'

type OmittedFields = 'password' | 'refresh_token'

type RewritedFields = 'created_at' | 'expires_at' | 'last_name' | 'agency_id'

export enum UserRoles {
  ADMINISTRATOR = 'administrator',
  SELLER = 'seller',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class User
  implements Readonly<Omit<users, OmittedFields | RewritedFields>>
{
  @ApiProperty({ type: String, example: 'johndoe' })
  username!: string
  @ApiProperty({ type: String, example: 'García López' })
  lastName!: string
  @ApiProperty({ type: String, example: 'active' })
  status!: UserStatus
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
    type: [Agency],
    description: 'Agencies associated with the user',
  })
  agencies!: Agency[]
  @ApiProperty({ type: String, example: 'mail@mail.com' })
  email!: string
  @ApiProperty({ type: Date })
  createdAt!: Date | null
  @ApiProperty({ type: String, example: '08123456789' })
  phone!: string | null
  @ApiProperty({ type: String, example: 'admin' })
  role!: UserRoles
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

export class AddAgenciesResponse extends CreateUserResponse {
  @ApiProperty({
    type: [String],
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  addedAgencies!: string[]
}

export class RemoveAgenciesResponse extends CreateUserResponse {
  @ApiProperty({
    type: [String],
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  removedAgencies!: string[]
}

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
