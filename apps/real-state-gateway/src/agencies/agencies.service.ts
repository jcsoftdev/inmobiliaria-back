import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { lastValueFrom, Observable } from 'rxjs'

import {
  PaginatedAgenciesResponse,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
  CreateAgencyDto,
  UpdateAgencyDto,
  AgencySingleProps,
} from '@app/contracts/agencies'
import { MICRO_SERVICES } from '@app/shared'

interface AgenciesGrpcService {
  findAll(props: AgencySingleProps): Observable<PaginatedAgenciesResponse>
  create(data: CreateAgencyDto): Observable<CreateAgencyResponse>
  update(request: {
    id: string
    data: UpdateAgencyDto
  }): Observable<UpdateAgencyResponse>
  delete(request: { id: string }): Observable<RemoveAgencyResponse>
}

@Injectable()
export class AgenciesService implements OnModuleInit {
  private agenciesService!: AgenciesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private readonly userManagementClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.agenciesService =
      this.userManagementClient.getService<AgenciesGrpcService>('AgencyService')
  }

  findAll(props: AgencySingleProps): Promise<PaginatedAgenciesResponse> {
    console.log('props', props, this.agenciesService)
    return lastValueFrom(this.agenciesService.findAll(props))
  }

  create(data: CreateAgencyDto): Promise<CreateAgencyResponse> {
    return lastValueFrom(this.agenciesService.create(data))
  }

  update(id: string, data: UpdateAgencyDto): Promise<UpdateAgencyResponse> {
    return lastValueFrom(this.agenciesService.update({ id, data }))
  }

  delete(id: string): Promise<RemoveAgencyResponse> {
    return lastValueFrom(this.agenciesService.delete({ id }))
  }
}
