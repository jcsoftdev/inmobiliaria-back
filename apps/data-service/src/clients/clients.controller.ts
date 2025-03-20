import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  ClientProps,
  PaginatedClientsResponse,
} from '@app/contracts/clients/clients.response'
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
  findOne(@Payload() id: string) {
    return this.clientsService.findOne(id)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdateClientDto }) {
    return this.clientsService.update(id, data)
  }

  @GrpcMethod(SERVICES.CLIENT, CLIENTS_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: string }) {
    return this.clientsService.remove(payload.id)
  }
}
