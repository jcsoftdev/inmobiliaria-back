import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { agencies, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class Agency implements agencies {
  @ApiProperty({ type: String, example: 'Agency name' })
  name!: string

  @ApiProperty({
    type: String,
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  id!: string

  @ApiProperty({ type: String, example: 'Av Los girasoles 397' })
  address!: string | null

  @ApiProperty({ type: String, example: '010230123' })
  phone!: string | null

  @ApiProperty({ type: String, example: 'test@gmail.com' })
  email!: string
  @ApiProperty({ type: Date })
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
  Prisma.agenciesOrderByWithRelationInput,
  Prisma.agenciesSelect
>

export type AgencySingleProps = Omit<AgencyProps, 'where' | 'orderBy'>
