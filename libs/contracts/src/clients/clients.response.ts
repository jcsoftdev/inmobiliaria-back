import { ApiResponseProperty } from '@nestjs/swagger'
import { clients, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class Client implements Omit<clients, 'created_at' | 'last_name'> {
  @ApiResponseProperty({ type: String })
  dni!: string
  @ApiResponseProperty({ type: String })
  lastName!: string
  @ApiResponseProperty({ type: String })
  address!: string
  @ApiResponseProperty({ type: Number })
  id!: string
  @ApiResponseProperty({ type: String })
  name!: string
  @ApiResponseProperty({ type: String })
  email!: string
  @ApiResponseProperty({ type: String })
  phone!: string | null
  @ApiResponseProperty({ type: Date })
  createdAt!: Date | null
}

export class PaginatedClientsResponse extends PaginatedResult<Client> {}

export class CreateClientResponse {
  @ApiResponseProperty({ type: String })
  message!: string
}

export class UpdateClientResponse extends CreateClientResponse {}

export class RemoveClientResponse extends CreateClientResponse {}

export type ClientProps = PaginationProps<
  Prisma.clientsWhereInput,
  Prisma.clientsOrderByWithRelationInput,
  Prisma.clientsSelect
>

export type ClientSingleProps = Omit<ClientProps, 'where' | 'orderBy'>
