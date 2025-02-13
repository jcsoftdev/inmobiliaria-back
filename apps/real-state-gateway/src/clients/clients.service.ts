import { CLIENTS_PATTERNS, Client } from '@app/contracts/clients'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class ClientsService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(): Observable<Client[]> {
    return this.userManagementClient.send<Client[]>(
      CLIENTS_PATTERNS.FIND_ALL,
      {},
    )
  }

  create(data: Client): Observable<Client> {
    return this.userManagementClient.send<Client>(CLIENTS_PATTERNS.CREATE, data)
  }

  update(id: number, data: Partial<Client>): Observable<Client> {
    return this.userManagementClient.send<Client>(CLIENTS_PATTERNS.UPDATE, {
      id,
      data,
    })
  }

  delete(id: number): Observable<Client> {
    return this.userManagementClient.send<Client>(CLIENTS_PATTERNS.REMOVE, {
      id,
    })
  }
}
