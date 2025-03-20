import { Observable } from 'rxjs'

import {
  Client,
  ClientSingleProps,
  CreateClientResponse,
  PaginatedClientsResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'
import { CreateClientDto } from '@app/contracts/clients/create-client.dto'
import { UpdateClientDto } from '@app/contracts/clients/update-client.dto'

export const CLIENTS_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  REMOVE: 'remove',
}

export interface ClientsGrpcService {
  findAll(props: ClientSingleProps): Observable<PaginatedClientsResponse>
  create(data: CreateClientDto): Observable<CreateClientResponse>
  update(data: UpdateClientDto): Observable<UpdateClientResponse>
  remove(id: string): Observable<RemoveClientResponse>
  findOne(id: string): Observable<Client>
}
