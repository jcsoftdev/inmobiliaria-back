import { ApiProperty } from '@nestjs/swagger'
import { visits } from '@prisma/client'

export enum VisitStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  DONE = 'done',
}

export class Visit implements visits {
  @ApiProperty()
  scheduled_at!: Date

  @ApiProperty()
  id!: number

  @ApiProperty()
  client_id!: number

  @ApiProperty({
    description: 'Visit status',
    example: VisitStatus.PENDING,
  })
  status!: VisitStatus

  @ApiProperty()
  created_at!: Date

  @ApiProperty()
  property_id!: number
}

export class VisitCreation {
  @ApiProperty({
    description: 'Visit scheduled date',
    example: '2021-08-01T00:00:00Z',
  })
  message!: string
}
