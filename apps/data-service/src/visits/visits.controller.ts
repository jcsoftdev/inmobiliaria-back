import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { VisitsService } from './visits.service'
import {
  CreateVisitDto,
  UpdateVisitDto,
  VISITS_PATTERNS,
} from '@app/contracts/visits'

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @MessagePattern(VISITS_PATTERNS.CREATE)
  create(@Payload() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto)
  }

  @MessagePattern(VISITS_PATTERNS.FIND_ALL)
  findAll() {
    return this.visitsService.findAll()
  }

  @MessagePattern(VISITS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.visitsService.findOne(id)
  }

  @MessagePattern(VISITS_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: number; data: UpdateVisitDto }) {
    return this.visitsService.update(id, data)
  }

  @MessagePattern(VISITS_PATTERNS.REMOVE)
  remove(@Payload() payload: { id: number }) {
    return this.visitsService.remove(payload.id)
  }
}
