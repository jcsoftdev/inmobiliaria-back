import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

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
import { SERVICES } from '@app/shared'

import { VisitsService } from './visits.service'

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @GrpcMethod(SERVICES.VISIT, VISITS_PATTERNS.CREATE)
  create(
    @Payload() createVisitDto: CreateVisitDto,
  ): Promise<CreateVisitResponse> {
    return this.visitsService.create(createVisitDto)
  }

  @GrpcMethod(SERVICES.VISIT, VISITS_PATTERNS.FIND_ALL)
  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return this.visitsService.findAll(props)
  }

  @GrpcMethod(SERVICES.VISIT, VISITS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string): Promise<Visit> {
    return this.visitsService.findOne(id)
  }

  @GrpcMethod(SERVICES.VISIT, VISITS_PATTERNS.UPDATE)
  update(
    @Payload() { id, data }: { id: string; data: UpdateVisitDto },
  ): Promise<UpdateVisitResponse> {
    return this.visitsService.update(id, data)
  }

  @GrpcMethod(SERVICES.VISIT, VISITS_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }): Promise<RemoveVisitResponse> {
    return this.visitsService.delete(payload.id)
  }
}
