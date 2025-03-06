import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { AGENCIES_PATTERNS, Agency, AgencyProps } from '@app/contracts/agencies'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @MessagePattern(AGENCIES_PATTERNS.CREATE)
  create(@Payload() createAgencyDto: Agency) {
    return this.agenciesService.create(createAgencyDto)
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ALL)
  findAll(props: AgencyProps) {
    return this.agenciesService.findAll(props)
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.agenciesService.findOne(id)
  }

  @MessagePattern(AGENCIES_PATTERNS.UPDATE)
  update(@Payload() updateAgencyDto: Agency) {
    return this.agenciesService.update(updateAgencyDto)
  }

  @MessagePattern(AGENCIES_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.agenciesService.remove(id)
  }
}
