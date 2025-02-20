import { Controller } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import {
  CreatePropertyDto,
  PROPERTIES_PATTERNS,
  Property,
} from '@app/contracts/properties'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PROPERTIES_PATTERNS.CREATE)
  create(@Payload() CreatePropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(CreatePropertyDto)
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ALL)
  findAll() {
    return this.propertiesService.findAll()
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PROPERTIES_PATTERNS.UPDATE)
  update(@Payload() updatePropertyDto: Property) {
    return this.propertiesService.update(updatePropertyDto)
  }

  @MessagePattern(PROPERTIES_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.propertiesService.remove(id)
  }
}
