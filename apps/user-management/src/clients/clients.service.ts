import { CLIENTS_PATTERNS, Client } from '@app/contracts/clients'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class ClientsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly clientsClient: ClientProxy,
  ) {}

  findAll(): Observable<Client[]> {
    return this.clientsClient.send<Client[]>(CLIENTS_PATTERNS.FIND_ALL, {})
  }

  create(data: Client): Observable<Client> {
    return this.clientsClient.send<Client>(CLIENTS_PATTERNS.CREATE, data)
  }

  findOne(id: number): Observable<Client> {
    return this.clientsClient.send<Client>(CLIENTS_PATTERNS.FIND_ONE, id)
  }
}
