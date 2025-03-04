import { LoginBody } from '@libs/auth'
import { ApiProperty } from '@nestjs/swagger'

export class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  access_token!: string
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refresh_token!: string
}

export class LoginDto implements LoginBody {
  @ApiProperty({
    example: 'jc2@dev.com',
    description: 'The username of the user',
  })
  username!: string

  @ApiProperty({
    example: 'seguro',
    description: 'The password of the user',
  })
  password!: string
}

export class RefreshDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'The refresh token',
  })
  token!: string
}
