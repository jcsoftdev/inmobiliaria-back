import { ApiProperty } from '@nestjs/swagger'

export type Visit = {
  id: number
  clientId: number
  propertyId: number
  scheduledAt: Date
  status?: string
  createdAt?: Date
}

export class VisitCreation {
  @ApiProperty({
    description: 'Visit scheduled date',
    example: '2021-08-01T00:00:00Z',
  })
  message!: string
}
