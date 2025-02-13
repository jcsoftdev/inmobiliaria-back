import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ClientsService } from './clients.service'
import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern(CLIENTS_PATTERNS.CREATE)
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @MessagePattern(CLIENTS_PATTERNS.FIND_ALL)
  findAll() {
    return this.clientsService.findAll()
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
