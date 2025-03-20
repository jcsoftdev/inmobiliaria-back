import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  AGENCIES_PATTERNS,
  CreateAgencyDto,
  PaginatedAgenciesResponse,
  UpdateAgencyDto,
} from '@app/contracts/agencies'
import { SERVICES } from '@app/shared'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  private async handleCreate(createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto)
  }

  private async handleFindAll(
    props: PaginateOptions,
  ): Promise<PaginatedAgenciesResponse> {
    return this.agenciesService.findAll(props)
  }

  private async handleFindOne(id: string) {
    return this.agenciesService.findOne(id)
  }

  private async handleUpdate(id: string, data: UpdateAgencyDto) {
    return this.agenciesService.update(id, data)
  }

  private async handleDelete(id: string) {
    return this.agenciesService.remove(id)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.CREATE)
  async create(@Payload() createAgencyDto: CreateAgencyDto) {
    return this.handleCreate(createAgencyDto)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ALL)
  async findAll(
    @Payload() props: PaginateOptions,
  ): Promise<PaginatedAgenciesResponse> {
    return this.handleFindAll(props)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string) {
    return this.handleFindOne(id)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.UPDATE)
  async update(@Payload() { id, data }: { id: string; data: UpdateAgencyDto }) {
    return this.handleUpdate(id, data)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.REMOVE)
  async delete(@Payload() payload: { id: string }) {
    return this.handleDelete(payload.id)
  }
}
