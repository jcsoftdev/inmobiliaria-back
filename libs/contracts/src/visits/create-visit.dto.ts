import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNumber } from 'class-validator'

import { VisitStatus } from '@app/contracts/visits/enums'

export class CreateVisitDto {
  @ApiProperty({
    description: 'Client id that will be visiting the property',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsNumber()
  clientId!: string

  @ApiProperty({
    description: 'Property id that will be visited',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  propertyId!: string

  @ApiProperty({
    description: 'Visit scheduled date',
    example: '2021-08-01T00:00:00Z',
  })
  @IsDateString()
  scheduledAt!: Date

  @ApiProperty({
    description: 'Visit status',
    example: VisitStatus.PENDING,
  })
  @IsEnum(VisitStatus)
  status!: VisitStatus
}
