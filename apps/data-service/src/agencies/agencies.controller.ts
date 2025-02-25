import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  AGENCIES_PATTERNS,
  CreateAgencyDto,
  PaginatedAgenciesResponse,
  UpdateAgencyDto,
} from '@app/contracts/agencies'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @MessagePattern(AGENCIES_PATTERNS.CREATE)
  create(@Payload() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto)
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ALL)
  findAll(props: PaginateOptions): Promise<PaginatedAgenciesResponse> {
    return this.agenciesService.findAll(props)
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.agenciesService.findOne(id)
  }

  @MessagePattern(AGENCIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: number; data: UpdateAgencyDto }) {
    return this.agenciesService.update(id, data)
  }

  @MessagePattern(AGENCIES_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: number }) {
    return this.agenciesService.remove(payload.id)
  }
}
