import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AgenciesService } from './agencies.service'
import { AGENCIES_PATTERNS, Agency } from '@app/contracts/agencies'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @MessagePattern(AGENCIES_PATTERNS.CREATE)
  create(@Payload() createAgencyDto: Agency) {
    return this.agenciesService.create(createAgencyDto)
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ALL)
  findAll() {
    return this.agenciesService.findAll()
  }

  @MessagePattern(AGENCIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.agenciesService.findOne(id)
  }

  /*
  @MessagePattern('updateAgency')
  update(@Payload() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(updateAgencyDto.id, updateAgencyDto);
  }

  @MessagePattern('removeAgency')
  remove(@Payload() id: number) {
    return this.agenciesService.remove(id);
  }
    */
}
