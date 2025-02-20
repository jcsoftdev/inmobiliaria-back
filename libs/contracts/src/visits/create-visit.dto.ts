import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNumber } from 'class-validator'

export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateVisitDto {
  @ApiProperty({
    description: 'Client id that will be visiting the property',
    example: 1,
  })
  @IsNumber()
  clientId!: number

  @ApiProperty({
    description: 'Property id that will be visited',
    example: 1,
  })
  propertyId!: number

  @ApiProperty({
    description: 'Visit scheduled date',
    example: '2021-08-01T00:00:00Z',
  })
  @IsDateString()
  scheduledAt!: Date

  @ApiProperty({
    description: 'Visit status',
    example: Status.PENDING,
  })
  @IsEnum(Status)
  status!: Status
}
