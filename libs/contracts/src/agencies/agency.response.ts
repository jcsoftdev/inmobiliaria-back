import { ApiResponseProperty } from '@nestjs/swagger'
import { agencies, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class Agency implements agencies {
  @ApiResponseProperty({ type: String })
  name!: string
  @ApiResponseProperty({ type: Number })
  id!: number
  @ApiResponseProperty({ type: String })
  address!: string | null
  @ApiResponseProperty({ type: String })
  phone!: string | null
  @ApiResponseProperty({ type: String })
  email!: string
  @ApiResponseProperty({ type: Date })
  created_at!: Date | null
}

export class PaginatedAgenciesResponse extends PaginatedResult<Agency> {}

export class CreateAgencyResponse {
  @ApiResponseProperty({ type: String })
  message!: string
}

export class UpdateAgencyResponse extends CreateAgencyResponse {}

export class RemoveAgencyResponse extends CreateAgencyResponse {}

export type AgencyProps = PaginationProps<
  Prisma.agenciesWhereInput,
  Prisma.agenciesOrderByWithRelationInput
>

export type AgencySingleProps = Omit<AgencyProps, 'where' | 'orderBy'>
