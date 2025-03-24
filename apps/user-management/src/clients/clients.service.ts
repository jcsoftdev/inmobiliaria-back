import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreateClientDto,
  UpdateClientDto,
  Client,
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
  ClientsGrpcService,
} from '@app/contracts/clients'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class ClientsService {
  private clientsService!: ClientsGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly clientsClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.clientsService = this.clientsClient.getService<ClientsGrpcService>(
      SERVICES.CLIENT,
    )
  }

  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return firstValueFrom(this.clientsService.findAll(props))
  }

  create(data: CreateClientDto): Promise<CreateClientResponse> {
    return firstValueFrom(this.clientsService.create(data))
  }

  findOne({ id }: { id: string }): Promise<Client> {
    return firstValueFrom(this.clientsService.findOne({ id }))
  }

  update(data: UpdateClientDto): Promise<UpdateClientResponse> {
    return firstValueFrom(this.clientsService.update(data))
  }

  delete({ id }: { id: string }): Promise<RemoveClientResponse> {
    return firstValueFrom(this.clientsService.delete({ id }))
  }
}
