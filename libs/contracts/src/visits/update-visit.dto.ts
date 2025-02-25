import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { VisitStatus } from '@app/contracts/visits/enums'

import { CreateVisitDto } from './create-visit.dto'

export class UpdateVisitDto extends PartialType(CreateVisitDto) {
  id!: number

  @ApiPropertyOptional({
    description: 'Client id that will be visiting the property',
    example: 1,
  })
  clientId?: number

  @ApiPropertyOptional({
    description: 'Property id that will be visited',
    example: 1,
  })
  propertyId?: number

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
