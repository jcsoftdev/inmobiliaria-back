import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'

@Injectable()
export class ClientsService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return firstValueFrom(
      this.userManagementClient.send<PaginatedClientsResponse>(
        CLIENTS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: CreateClientDto): Promise<CreateClientResponse> {
    return firstValueFrom(
      this.userManagementClient.send<CreateClientResponse, CreateClientDto>(
        CLIENTS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(
    id: number,
    data: Partial<UpdateClientDto>,
  ): Promise<UpdateClientResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateClientResponse>(
        CLIENTS_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: number): Promise<RemoveClientResponse> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveClientResponse>(
        CLIENTS_PATTERNS.REMOVE,
        {
          id,
        },
      ),
    )
  }
}
