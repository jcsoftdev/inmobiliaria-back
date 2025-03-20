import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { IsUUIDv7 } from '@app/common/decorators'
import { VisitStatus } from '@app/contracts/visits/enums'

import { CreateVisitDto } from './create-visit.dto'

export class UpdateVisitDto extends PartialType(CreateVisitDto) {
  @IsUUIDv7()
  id!: string

  @ApiPropertyOptional({
    description: 'Client id that will be visiting the property',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
  clientId?: string

  @ApiPropertyOptional({
    description: 'Property id that will be visited',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
  propertyId?: string

  @ApiPropertyOptional({
    description: 'Visit scheduled date',
    example: '2021-08-01T00:00:00Z',
  })
  scheduledAt?: Date

  @ApiPropertyOptional({
    description: 'Visit status',
    example: VisitStatus.PENDING,
  })
  status?: VisitStatus
}
