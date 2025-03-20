import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
  Client,
  ClientProps,
  PaginatedClientsResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients'
import { SERVICES } from '@app/shared'

import { ClientsService } from './clients.service'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.CREATE)
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.FIND_ALL)
  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return this.clientsService.findAll(props)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.FIND_ONE)
  findOne(@Payload() payload: { id: string }): Promise<Client> {
    return this.clientsService.findOne(payload)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.UPDATE)
  update(
    @Payload() updateClientDto: UpdateClientDto,
  ): Promise<UpdateClientResponse> {
    return this.clientsService.update(updateClientDto)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }): Promise<RemoveClientResponse> {
    return this.clientsService.delete(payload)
  }
}
