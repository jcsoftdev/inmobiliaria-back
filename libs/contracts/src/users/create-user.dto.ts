import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  name!: string

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    description: 'Agency id',
    example: 1,
  })
  @IsNumber()
  agencyId!: number

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
}
