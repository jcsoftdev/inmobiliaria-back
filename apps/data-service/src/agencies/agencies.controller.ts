import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  AGENCIES_PATTERNS,
  AgencySingleProps,
  CreateAgencyDto,
  PaginatedAgenciesResponse,
  UpdateAgencyDto,
} from '@app/contracts/agencies'
import { SERVICES } from '@app/shared'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.CREATE)
  async create(@Payload() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ALL)
  async findAll(
    @Payload() props: AgencySingleProps,
  ): Promise<PaginatedAgenciesResponse> {
    console.log(
      'Received payload in data-service:',
      JSON.stringify(props, null, 2),
    )
    const { q, ...rest } = props
    return this.agenciesService.findAll({ q, ...rest })
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ONE)
  async findOne(@Payload() param: { id: string }) {
    return this.agenciesService.findOne(param)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.UPDATE)
  async update(@Payload() data: UpdateAgencyDto) {
    return this.agenciesService.update(data)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.DELETE)
  async delete(@Payload() payload: { id: string }) {
    return this.agenciesService.delete(payload)
  }
}
