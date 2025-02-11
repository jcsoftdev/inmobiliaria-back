import { Controller } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { MessagePattern } from '@nestjs/microservices'
import { PROPERTIES_PATTERNS, Property } from '@app/contracts/properties'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ALL)
  findAll() {
    return this.propertiesService.findAll()
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ONE)
  findOne(id: number) {
    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PROPERTIES_PATTERNS.CREATE)
  create(data: Property) {
    return this.propertiesService.create(data)
  }
}
