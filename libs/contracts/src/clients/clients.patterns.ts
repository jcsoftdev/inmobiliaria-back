import { Observable } from 'rxjs'

import {
  Client,
  ClientSingleProps,
  CreateClientResponse,
  PaginatedClientsResponse,
  RemoveClientResponse,
  UpdateClientResponse,
  CreateClientDto,
  UpdateClientDto,
} from '@app/contracts/clients'

export const CLIENTS_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
}

export interface ClientsGrpcService {
  findAll(props: ClientSingleProps): Observable<PaginatedClientsResponse>
  create(data: CreateClientDto): Observable<CreateClientResponse>
  update(data: UpdateClientDto): Observable<UpdateClientResponse>
  delete({ id }: { id: string }): Observable<RemoveClientResponse>
  findOne({ id }: { id: string }): Observable<Client>
}
