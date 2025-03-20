import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import {
  Agency,
  AgencyProps,
  CreateAgencyResponse,
  PaginatedAgenciesResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'

interface AgenciesGrpcService {
  findAll(props: AgencyProps): Promise<PaginatedAgenciesResponse>
  create(data: Agency): Promise<CreateAgencyResponse>
  findOne(id: string): Promise<Agency>
  update(updateAgencyDto: Agency): Promise<UpdateAgencyResponse>
  remove(id: string): Promise<RemoveAgencyResponse>
}

@Injectable()
export class AgenciesService implements OnModuleInit {
  private agenciesService!: AgenciesGrpcService

  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly agenciesClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.agenciesService =
      this.agenciesClient.getService<AgenciesGrpcService>('AgencyService')
  }

  async findAll(props: AgencyProps): Promise<PaginatedAgenciesResponse> {
    console.log('this.agenciesService')
    console.log(this.agenciesService)
    return await this.agenciesService.findAll(props)
  }

  async create(data: Agency): Promise<CreateAgencyResponse> {
    return await this.agenciesService.create(data)
  }

  async findOne(id: string): Promise<Agency> {
    return await this.agenciesService.findOne(id)
  }

  async update(updateAgencyDto: Agency): Promise<UpdateAgencyResponse> {
    return await this.agenciesService.update(updateAgencyDto)
  }

  async remove(id: string): Promise<RemoveAgencyResponse> {
    return await this.agenciesService.remove(id)
  }
}
