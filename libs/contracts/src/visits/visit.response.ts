import { ApiProperty } from '@nestjs/swagger'
import { Prisma, visits } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'
import { VisitStatus } from '@app/contracts/visits/enums'

export class Visit implements visits {
  @ApiProperty()
  scheduled_at!: Date

  @ApiProperty()
  id!: string

  @ApiProperty({
    description: 'Visit status',
    example: VisitStatus.PENDING,
  })
  status!: VisitStatus

  @ApiProperty()
  created_at!: Date

  @ApiProperty()
  property_id!: string

  @ApiProperty()
  client_id!: string | null
}

export class CreateVisitResponse {
  @ApiProperty({
    description: 'Visit created',
  })
  message!: string
}

export class PaginatedVisitsResponse extends PaginatedResult<Visit> {}

export class UpdateVisitResponse extends CreateVisitResponse {}

export class RemoveVisitResponse extends CreateVisitResponse {}

export type VisitFields = 'scheduled_at' | 'status' | 'created_at'

export type VisitProps = PaginationProps<
  Prisma.visitsWhereInput,
  Prisma.visitsOrderByWithRelationInput,
  VisitFields
>

export type VisitSingleProps = Omit<VisitProps, 'where' | 'orderBy'>
