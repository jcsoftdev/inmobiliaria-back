import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { AGENCIES_PATTERNS, Agency, AgencyProps } from '@app/contracts/agencies'
import { SERVICES } from '@app/shared'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ALL)
  findAll(@Payload() props: AgencyProps) {
    return this.agenciesService.findAll(props)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.CREATE)
  create(@Payload() createAgencyDto: Agency) {
    return this.agenciesService.create(createAgencyDto)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.agenciesService.findOne(id)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.UPDATE)
  update(@Payload() updateAgencyDto: Agency) {
    return this.agenciesService.update(updateAgencyDto)
  }

  @GrpcMethod(SERVICES.AGENCY, AGENCIES_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.agenciesService.remove(id)
  }
}
