import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id!: string

  @ApiPropertyOptional({ description: 'User name', example: 'John Doe' })
  name?: string

  @ApiPropertyOptional({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  email?: string

  @ApiPropertyOptional({ description: 'User role', example: 'admin' })
  role?: string
}
