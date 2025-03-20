import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

import {
  PaginatedAgenciesResponse,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
  CreateAgencyDto,
  UpdateAgencyDto,
  AgencySingleProps,
  AgenciesGrpcService,
} from '@app/contracts/agencies'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class AgenciesService implements OnModuleInit {
  private agenciesService!: AgenciesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private readonly userManagementClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.agenciesService =
      this.userManagementClient.getService<AgenciesGrpcService>(SERVICES.AGENCY)
  }

  findAll(props: AgencySingleProps): Promise<PaginatedAgenciesResponse> {
    return lastValueFrom(this.agenciesService.findAll(props))
  }

  create(data: CreateAgencyDto): Promise<CreateAgencyResponse> {
    return lastValueFrom(this.agenciesService.create(data))
  }

  update(data: UpdateAgencyDto): Promise<UpdateAgencyResponse> {
    console.log({ data })
    return lastValueFrom(this.agenciesService.update(data))
  }

  delete(id: string): Promise<RemoveAgencyResponse> {
    return lastValueFrom(this.agenciesService.delete(id))
  }
}
