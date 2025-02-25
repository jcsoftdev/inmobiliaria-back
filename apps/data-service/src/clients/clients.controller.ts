import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  ClientProps,
  PaginatedClientsResponse,
} from '@app/contracts/clients/clients.response'

import { ClientsService } from './clients.service'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern(CLIENTS_PATTERNS.CREATE)
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @MessagePattern(CLIENTS_PATTERNS.FIND_ALL)
  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return this.clientsService.findAll(props)
  }

  @MessagePattern(CLIENTS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.clientsService.findOne(id)
  }

  @MessagePattern(CLIENTS_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: number; data: UpdateClientDto }) {
    return this.clientsService.update(id, data)
  }

  @MessagePattern(CLIENTS_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: number }) {
    return this.clientsService.remove(payload.id)
  }
}
