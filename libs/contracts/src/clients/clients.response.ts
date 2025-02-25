import { ApiResponseProperty } from '@nestjs/swagger'
import { clients, Prisma } from '@prisma/client'
import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class Client implements clients {
  @ApiResponseProperty({ type: Number })
  id!: number
  @ApiResponseProperty({ type: String })
  name!: string
  @ApiResponseProperty({ type: String })
  email!: string
  @ApiResponseProperty({ type: String })
  phone!: string | null
  @ApiResponseProperty({ type: Date })
  created_at!: Date | null
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
  Prisma.clientsOrderByWithRelationInput
>

export type ClientSingleProps = Omit<ClientProps, 'where' | 'orderBy'>
