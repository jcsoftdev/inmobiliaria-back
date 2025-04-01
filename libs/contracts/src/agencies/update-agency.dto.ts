import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

import { IsUUIDv7 } from '@app/common/decorators'

import { CreateAgencyDto } from './create-agency.dto'

export class UpdateAgencyDto extends PartialType(CreateAgencyDto) {
  @IsUUIDv7()
  id!: string
  @ApiPropertyOptional({
    description: 'Agency address',
    example: '123 Main St, New York, NY 10001',
  })
  @IsOptional()
  address?: string

  @ApiPropertyOptional({
    description: 'Agency email',
    example: 'emial@test.com',
  })
  @IsOptional()
  email?: string

  @ApiPropertyOptional({
    description: 'Agency name',
    example: 'Agency Name',
  })
  name?: string

  @ApiPropertyOptional({
    description: 'Agency phone',
    example: '123-456-7890',
  })
  @IsOptional()
  phone?: string

  @ApiPropertyOptional({
    description: 'Agency RUC',
    example: '1234567890123',
  })
  ruc?: string
}
