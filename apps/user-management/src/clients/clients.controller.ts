import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ClientsService } from './clients.service'
import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  Client,
  RemoveClient,
  UpdateClient,
} from '@app/contracts/clients/clients.response'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern(CLIENTS_PATTERNS.CREATE)
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @MessagePattern(CLIENTS_PATTERNS.FIND_ALL)
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll()
  }

  @MessagePattern(CLIENTS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number): Promise<Client> {
    return this.clientsService.findOne(id)
  }

  @MessagePattern(CLIENTS_PATTERNS.UPDATE)
  update(@Payload() updateClientDto: UpdateClientDto): Promise<UpdateClient> {
    return this.clientsService.update(updateClientDto)
  }

  @MessagePattern(CLIENTS_PATTERNS.REMOVE)
  remove(@Payload() id: number): Promise<RemoveClient> {
    return this.clientsService.remove(id)
  }
}
