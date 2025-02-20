import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { VisitsService } from './visits.service'
import { CreateVisitDto, VISITS_PATTERNS, Visit } from '@app/contracts/visits'

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
  update(@Payload() updateVisitDto: Visit) {
    return this.visitsService.update(updateVisitDto)
  }

  @MessagePattern(VISITS_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.visitsService.remove(id)
  }
}
