import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ClientsService } from './clients.service'
import { CLIENTS_PATTERNS, Client } from '@app/contracts/clients'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern(CLIENTS_PATTERNS.CREATE)
  create(@Payload() createClientDto: Client) {
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
  update(@Payload() updateClientDto: Client) {
    return this.clientsService.update(updateClientDto)
  }

  @MessagePattern(CLIENTS_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.clientsService.remove(id)
  }
}
