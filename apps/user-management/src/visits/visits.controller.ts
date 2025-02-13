import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { VisitsService } from './visits.service'
import { CreateVisitDto } from './dto/create-visit.dto'
import { UpdateVisitDto } from './dto/update-visit.dto'

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @MessagePattern('createVisit')
  create(@Payload() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto)
  }

  @MessagePattern('findAllVisits')
  findAll() {
    return this.visitsService.findAll()
  }

  @MessagePattern('findOneVisit')
  findOne(@Payload() id: number) {
    return this.visitsService.findOne(id)
  }

  @MessagePattern('updateVisit')
  update(@Payload() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(updateVisitDto.id, updateVisitDto)
  }

  @MessagePattern('removeVisit')
  remove(@Payload() id: number) {
    return this.visitsService.remove(id)
  }
}
