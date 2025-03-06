import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { CreateAgencyDto } from './create-agency.dto'

export class UpdateAgencyDto extends PartialType(CreateAgencyDto) {
  id!: string
  @ApiPropertyOptional({
    description: 'Agency address',
    example: '123 Main St, New York, NY 10001',
  })
  address?: string

  @ApiPropertyOptional({
    description: 'Agency email',
    example: 'emial@test.com',
  })
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
  phone?: string
}
