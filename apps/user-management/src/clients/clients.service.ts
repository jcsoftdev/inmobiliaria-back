import {
  CLIENTS_PATTERNS,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'
import {
  Client,
  CreationClient,
  RemoveClient,
  UpdateClient,
} from '@app/contracts/clients/clients.response'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class ClientsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly clientsClient: ClientProxy,
  ) {}

  findAll(): Promise<Client[]> {
    return firstValueFrom(
      this.clientsClient.send<Client[]>(CLIENTS_PATTERNS.FIND_ALL, {}),
    )
  }

  create(data: CreateClientDto): Promise<CreationClient> {
    return firstValueFrom(
      this.clientsClient.send<CreationClient>(CLIENTS_PATTERNS.CREATE, data),
    )
  }

  findOne(id: number): Promise<Client> {
    return firstValueFrom(
      this.clientsClient.send<Client>(CLIENTS_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: UpdateClientDto): Promise<UpdateClient> {
    return firstValueFrom(
      this.clientsClient.send<UpdateClient>(CLIENTS_PATTERNS.UPDATE, id),
    )
  }

  remove(id: number): Promise<RemoveClient> {
    return firstValueFrom(
      this.clientsClient.send<RemoveClient>(CLIENTS_PATTERNS.REMOVE, id),
    )
  }
}
