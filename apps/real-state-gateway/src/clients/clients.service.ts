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
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(): Promise<Client[]> {
    return firstValueFrom(
      this.userManagementClient.send<Client[]>(CLIENTS_PATTERNS.FIND_ALL, {}),
    )
  }

  create(data: CreateClientDto): Promise<CreationClient> {
    return firstValueFrom(
      this.userManagementClient.send<CreationClient>(
        CLIENTS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: number, data: Partial<UpdateClientDto>): Promise<UpdateClient> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateClient>(CLIENTS_PATTERNS.UPDATE, {
        id,
        data,
      }),
    )
  }

  delete(id: number): Promise<RemoveClient> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveClient>(CLIENTS_PATTERNS.REMOVE, {
        id,
      }),
    )
  }
}
