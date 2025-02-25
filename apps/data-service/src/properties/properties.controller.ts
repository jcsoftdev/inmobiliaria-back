import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import {
  PROPERTIES_PATTERNS,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertyProps,
} from '@app/contracts/properties'

import { PropertiesService } from './properties.service'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PROPERTIES_PATTERNS.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto)
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ALL)
  findAll(props: PropertyProps) {
    return this.propertiesService.findAll(props)
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PROPERTIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: number; data: UpdatePropertyDto }) {
    return this.propertiesService.update(id, data)
  }

  @MessagePattern(PROPERTIES_PATTERNS.REMOVE)
  delete(@Payload() playload: { id: number }) {
    return this.propertiesService.remove(playload.id)
  }
}
