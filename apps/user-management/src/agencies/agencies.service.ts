import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { lastValueFrom, Observable } from 'rxjs'

import {
  Agency,
  AgencyProps,
  CreateAgencyResponse,
  PaginatedAgenciesResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

interface AgenciesGrpcService {
  findAll(props: AgencyProps): Observable<PaginatedAgenciesResponse>
  create(data: Agency): Observable<CreateAgencyResponse>
  findOne(id: string): Observable<Agency>
  update(updateAgencyDto: Agency): Observable<UpdateAgencyResponse>
  remove(id: string): Observable<RemoveAgencyResponse>
}

@Injectable()
export class AgenciesService implements OnModuleInit {
  private agenciesService!: AgenciesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly agenciesClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.agenciesService = this.agenciesClient.getService<AgenciesGrpcService>(
      SERVICES.AGENCY,
    )
  }

  async findAll(props: AgencyProps): Promise<PaginatedAgenciesResponse> {
    return lastValueFrom(this.agenciesService.findAll(props))
  }

  async create(data: Agency): Promise<CreateAgencyResponse> {
    return lastValueFrom(this.agenciesService.create(data))
  }

  async findOne(id: string): Promise<Agency> {
    return lastValueFrom(this.agenciesService.findOne(id))
  }

  async update(updateAgencyDto: Agency): Promise<UpdateAgencyResponse> {
    return lastValueFrom(this.agenciesService.update(updateAgencyDto))
  }

  async remove(id: string): Promise<RemoveAgencyResponse> {
    return lastValueFrom(this.agenciesService.remove(id))
  }
}
