import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import {
  CreateVisitDto,
  CreateVisitResponse,
  PaginatedVisitsResponse,
  RemoveVisitResponse,
  UpdateVisitDto,
  UpdateVisitResponse,
  Visit,
  VisitProps,
  VISITS_PATTERNS,
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
  update(
    @Payload() { id, data }: { id: number; data: UpdateVisitDto },
  ): Promise<UpdateVisitResponse> {
    return this.visitsService.update(id, data)
  }

  @MessagePattern(VISITS_PATTERNS.REMOVE)
  remove(@Payload() payload: { id: number }): Promise<RemoveVisitResponse> {
    return this.visitsService.remove(payload.id)
  }
}
