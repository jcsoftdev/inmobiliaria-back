import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  ClientProps,
  CLIENTS_PATTERNS,
  CreateClientDto,
  PaginatedClientsResponse,
  UpdateClientDto,
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
  findOne(@Payload() payload: { id: string }) {
    return this.clientsService.findOne(payload)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdateClientDto }) {
    return this.clientsService.update(id, data)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }) {
    return this.clientsService.delete(payload)
  }
}
