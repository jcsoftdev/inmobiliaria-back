import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  Client,
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'

@Injectable()
export class ClientsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly clientsClient: ClientProxy,
  ) {}

  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return firstValueFrom(
      this.clientsClient.send<PaginatedClientsResponse, PaginateOptions>(
        CLIENTS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: CreateClientDto): Promise<CreateClientResponse> {
    return firstValueFrom(
      this.clientsClient.send<CreateClientResponse>(
        CLIENTS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  findOne(id: string): Promise<Client> {
    return firstValueFrom(
      this.clientsClient.send<Client>(CLIENTS_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: UpdateClientDto): Promise<UpdateClientResponse> {
    return firstValueFrom(
      this.clientsClient.send<UpdateClientResponse>(
        CLIENTS_PATTERNS.UPDATE,
        id,
      ),
    )
  }

  remove(id: string): Promise<RemoveClientResponse> {
    return firstValueFrom(
      this.clientsClient.send<RemoveClientResponse>(
        CLIENTS_PATTERNS.REMOVE,
        id,
      ),
    )
  }
}
