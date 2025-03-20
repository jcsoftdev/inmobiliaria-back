import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
  ClientSingleProps,
} from '@app/contracts/clients/clients.response'

interface ClientsGrpcService {
  findAll(props: ClientSingleProps): Observable<PaginatedClientsResponse>
  create(data: CreateClientDto): Observable<CreateClientResponse>
  update(request: {
    id: string
    data: Partial<UpdateClientDto>
  }): Observable<UpdateClientResponse>
  delete(request: { id: string }): Observable<RemoveClientResponse>
}

@Injectable()
export class ClientsService {
  private clientsService!: ClientsGrpcService
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly clientManagementClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.clientsService =
      this.clientManagementClient.getService<ClientsGrpcService>(
        'ClientService',
      )
  }

  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return firstValueFrom(this.clientsService.findAll(props))
  }

  create(data: CreateClientDto): Promise<CreateClientResponse> {
    return firstValueFrom(this.clientsService.create(data))
  }

  update(
    id: string,
    data: Partial<UpdateClientDto>,
  ): Promise<UpdateClientResponse> {
    return firstValueFrom(
      // ),
      this.clientsService.update({ id, data }),
    )
  }

  delete(id: string): Promise<RemoveClientResponse> {
    return firstValueFrom(this.clientsService.delete({ id }))
  }
}
