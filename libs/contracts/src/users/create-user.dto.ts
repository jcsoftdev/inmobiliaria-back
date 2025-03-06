import { ApiProperty } from '@nestjs/swagger'
import { users } from '@prisma/client'
import { IsDateString, IsEmail, IsString } from 'class-validator'

import { IsUUIDv7 } from '@app/common/decorators'

export class CreateUserDto
  implements
    Omit<
      users,
      | 'id'
      | 'agency_id'
      | 'created_at'
      | 'refresh_token'
      | 'expires_at'
      | 'last_name'
    >
{
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  name!: string

  @ApiProperty({
    description: 'User last name',
    example: 'García Rodríguez',
  })
  @IsString()
  lastName!: string

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    description: 'Agency id',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
  agencyId!: string

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsString()
  password!: string

  @ApiProperty({
    description: 'User phone',
    example: '08123456789',
  })
  @IsString()
  phone!: string

  @ApiProperty({
    description: 'User role',
    example: 'admin',
  })
  @IsString()
  role!: string

  @ApiProperty({
    description: 'User username',
    example: 'johndoe',
  })
  @IsString()
  username!: string

  @ApiProperty({
    description: 'User status',
    example: 'active',
  })
  @IsString()
  status!: string

  @ApiProperty({
    description: 'User dni',
    example: '123456789',
  })
  @IsString()
  dni!: string

  @ApiProperty({
    description: 'User expires at',
    example: new Date(),
  })
  @IsDateString()
  expiresAt!: Date | null
}
