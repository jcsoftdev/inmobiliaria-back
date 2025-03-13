import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsOptional, IsArray } from 'class-validator'

import { IsUUIDv7 } from '@app/common/decorators'

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

  @ApiPropertyOptional({
    description: 'List of Agency IDs',
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  @IsOptional()
  @IsArray()
  @IsUUIDv7({ each: true })
  agencyIds?: string[]

  @ApiPropertyOptional({ description: 'Date expires', example: new Date() })
  @IsDateString()
  expiresAt?: Date

  @ApiPropertyOptional({ description: 'User role', example: 'admin' })
  role?: string
}

export class UpdateUserAgencyDto {
  userId!: string

  @ApiPropertyOptional({
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  agencyIds?: string[]
}
