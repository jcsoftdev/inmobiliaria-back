import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import {
  CreateVisitDto,
  CreateVisitResponse,
  PaginatedVisitsResponse,
  RemoveVisitResponse,
  UpdateVisitResponse,
  VISITS_PATTERNS,
  Visit,
  VisitProps,
} from '@app/contracts/visits'

import { VisitsService } from './visits.service'

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @MessagePattern(VISITS_PATTERNS.CREATE)
  create(
    @Payload() createVisitDto: CreateVisitDto,
  ): Promise<CreateVisitResponse> {
    return this.visitsService.create(createVisitDto)
  }

  @MessagePattern(VISITS_PATTERNS.FIND_ALL)
  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return this.visitsService.findAll(props)
  }

  @MessagePattern(VISITS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number): Promise<Visit> {
    return this.visitsService.findOne(id)
  }

  @MessagePattern(VISITS_PATTERNS.UPDATE)
  update(@Payload() updateVisitDto: Visit): Promise<UpdateVisitResponse> {
    return this.visitsService.update(updateVisitDto)
  }

  @MessagePattern(VISITS_PATTERNS.REMOVE)
  remove(@Payload() id: number): Promise<RemoveVisitResponse> {
    return this.visitsService.remove(id)
  }
}
